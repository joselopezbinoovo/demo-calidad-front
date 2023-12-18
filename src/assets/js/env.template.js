(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["BACKEND_URL"] = "${BACKEND_URL}";
    window["env"]["LOOPBACK_URL"] = "${LOOPBACK_URL}";
    window["env"]["METABASE_URL"] = "${METABASE_URL}";
    window["env"]["S3_ENDPOINT"] = "${S3_ENDPOINT}";
    window["env"]["S3_BUCKET"] = "${S3_BUCKET}";
})(this);
