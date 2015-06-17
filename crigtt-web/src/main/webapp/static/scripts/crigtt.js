(function ($) {
    //====================================================================================================
    // EXTENSIONS: STRING
    //====================================================================================================
    $.extend(String, {
        "EMPTY": "",
        "LF": "\n",
        "SPACE": " "
    });
    
    //====================================================================================================
    // EXTENSIONS: JQUERY FUNCTIONS
    //====================================================================================================
    $.extend($.fn, {
        "disable": function () {
            return this.attr("disabled", "disabled");
        },
        
        "isDisabled": function () {
            return (this.attr("disabled") == "disabled");
        },
        
        "enable": function () {
            return this.removeAttr("disabled");
        },
        
        "toggleDisabled": function () {
            return (this.isDisabled() ? this.enable() : this.disable());
        }
    });
    
    //====================================================================================================
    // NAMESPACE: MAIN
    //====================================================================================================
    $.extend($, {
        "crigtt": {}
    });
    
    //====================================================================================================
    // EVENT HANDLERS
    //====================================================================================================
    $(window).load(function () {
        var contentTabsElem = $("div#content-tabs");
        var homeContentTabElem = contentTabsElem.find("div#content-tab-home");
        var validatorContentTabElem = contentTabsElem.find("div#content-tab-validator");
        var validatorFormElem = validatorContentTabElem.find("form#form-validator");
        var validatorDocFileInputElem = validatorFormElem.find("input#input-file-doc");
        var validatorDisplayDocFileInputElem = validatorFormElem.find("input#input-file-doc-display");
        var validatorUploadButtonElem = validatorFormElem.find("button#btn-validator-upload");
        var validatorResultsProcessingWellElem = validatorContentTabElem.find("div#well-validator-results-processing");
        var validatorResultsEmptyWellElem = validatorContentTabElem.find("div#well-validator-results-empty");
        var validatorResultsPanelGroupElem = validatorContentTabElem.find("div#panel-group-validator-results");
        
        validatorDisplayDocFileInputElem.click($.proxy(function (event) {
            event.preventDefault();
            
            validatorDocFileInputElem.click();
        }, this));
        
        validatorDocFileInputElem.change($.proxy(function () {
            var validatorDocFileName = validatorDocFileInputElem.val();
            
            validatorDisplayDocFileInputElem.val(validatorDocFileName);
            
            if (validatorDocFileName) {
                validatorUploadButtonElem.enable();
            } else {
                validatorUploadButtonElem.disable();
            }
        }, this));
        
        if (validatorDocFileInputElem.get(0).files.length == 1) {
            validatorUploadButtonElem.enable();
        }
        
        var validator = new $.crigtt.validate.Validator(validatorFormElem);
        
        validatorFormElem.submit(function (event) {
            event.preventDefault();
            
            validator.validate.apply(validator, [
                $.crigtt.validate.ValidatorContentType.JSON,
                {
                    "beforeSend": function () {
                        $("div.panel div.panel-collapse", validatorResultsPanelGroupElem).collapse("hide");
                        
                        validatorUploadButtonElem.disable();
                        
                        validatorResultsProcessingWellElem.show();
                        validatorResultsEmptyWellElem.hide();
                    },
                    "complete": function () {
                        validatorUploadButtonElem.enable();
                        
                        validatorResultsProcessingWellElem.hide();
                        validatorResultsEmptyWellElem.hide();
                        
                        validatorResultsPanelGroupElem.show();
                    },
                    "data": new FormData(this),
                    "process": function (resp, httpStatus, httpStatusText) {
                        validatorResultsPanelGroupElem.prepend(validator.resultPanel.apply(validator, [ resp, httpStatus, httpStatusText ]));
                    }
                }
            ]);
        });
    });
}(jQuery));
