import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BlockStatus, FormStates } from 'src/app/shared/enums';
import { CustomDataControllerService, FormBlock, FormControllerService, FormPartial, FormWithRelations } from 'src/app/shared/modules/api-client';

const NO_OK = 'NO OK';

interface IBlockStatusDTO {
    empty: boolean;
    pending: boolean;
    error: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class FormService {
    public form$: BehaviorSubject<FormWithRelations>;
    public formBlocks$: BehaviorSubject<FormBlock[]>;

    constructor(
        private service: FormControllerService,
        private customDataService: CustomDataControllerService
    ) {
        this.form$ = new BehaviorSubject(null);
        this.formBlocks$ = new BehaviorSubject([]);
    }

    loadForm(formId: string): void {
        this.getForm(formId).subscribe();
    }

    getForm(formId: string): Observable<FormWithRelations> {
        return forkJoin([
            this.service.formControllerFindById(formId),
            this.customDataService.customDataControllerFind()
        ]).pipe(switchMap(([resForm, customData]) => {
            console.log(resForm)
            resForm.blocks.forEach(block => {
                block.inputs.forEach(input => {
                    input.descriptionHeader = '<p class="nameInput">' + input.name + '</p>' + input.description;
                    input.options = customData.find((custom => input.selects.includes(custom.key)))?.values || [''];
                });
            });
            const form = {
                ...resForm,
                /* status: this.getFormStatus() */
            };
            const blocks = [
                ...form.blocks,
            ];
            // const {blocks} = form;
            this.form$.next(form);
            this.formBlocks$.next(blocks);

            return of(form as FormWithRelations);
        }));
    }

    updateForm(id: string, body: FormPartial): Observable<FormWithRelations> {
        console.log(body)
        return this.service.formControllerUpdateById(id, body);
        // return forkJoin([
        //     this.service.formControllerUpdateById(id, body)
        // ]).pipe(
        //     switchMap(() => {
        //         return this.getForm(id);
        //     })
        // );
    }

    getFormStatus(): string {
        const form = this.form$.getValue();
        if (!form) { return FormStates.creado; }
        const {status} = form;
        const blocks = this.formBlocks$.getValue();
        const found = blocks.filter((block) => !block?.status || block.status !== FormStates.finalizado);
        if (found.length === 0 && status !== FormStates.finalizado) {
            return FormStates.pendienteFinalizar;
        }
        return status;
    }

    getBlockStatus(blockIndex: number): string {
        const { inputs } = this.formBlocks$.getValue()[blockIndex];

        const isEmpty = inputs.every(input => [undefined, ''].includes(input.value));
        const hasError = !!inputs.find(input => input.value === NO_OK);
        const isPending = !!inputs.find(input => input.value === ('' || undefined));

        return isEmpty && BlockStatus.empty || hasError &&  BlockStatus.failure || isPending && BlockStatus.pending || BlockStatus.success;
    }
}
