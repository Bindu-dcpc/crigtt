(function ($) {
    //====================================================================================================
    // NAMESPACE: VALIDATION
    //====================================================================================================
    $.extend($.crigtt, {
        "validate": {}
    });
    
    //====================================================================================================
    // CLASS: VALIDATOR CONTENT TYPE ITEM
    //====================================================================================================
    $.extend($.crigtt.validate, {
        "ValidatorContentTypeItem": function (ext, dataType, type) {
            this.ext = ext;
            this.dataType = dataType;
            this.type = type;
        }
    });
    
    $.extend($.crigtt.validate.ValidatorContentTypeItem.prototype, {
        "contentMediaType": undefined,
        "dataType": undefined,
        "ext": undefined,
        "type": undefined
    });
    
    //====================================================================================================
    // ENUM: VALIDATOR CONTENT TYPE
    //====================================================================================================
    $.extend($.crigtt.validate, {
        "ValidatorContentType": new Enum({
            "JSON": new $.crigtt.validate.ValidatorContentTypeItem(".json", "json", "application/json"),
            "XML": new $.crigtt.validate.ValidatorContentTypeItem(".xml", "xml", "text/xml")
        })
    });
    
    //====================================================================================================
    // CLASS: VALIDATOR EVENT LEVEL ITEM
    //====================================================================================================
    $.extend($.crigtt.validate, {
        "ValidatorEventLevelItem": function (uiEventLevel) {
            this.uiEventLevel = uiEventLevel;
        }
    });
    
    $.extend($.crigtt.validate.ValidatorEventLevelItem.prototype, {
        "uiEventLevel": undefined
    });
    
    //====================================================================================================
    // ENUM: VALIDATOR EVENT LEVEL
    //====================================================================================================
    $.extend($.crigtt.validate, {
        "ValidatorEventLevel": new Enum({
            "INFO": new $.crigtt.validate.ValidatorEventLevelItem($.crigtt.ui.UiEventLevel.INFO),
            "WARN": new $.crigtt.validate.ValidatorEventLevelItem($.crigtt.ui.UiEventLevel.WARNING),
            "ERROR": new $.crigtt.validate.ValidatorEventLevelItem($.crigtt.ui.UiEventLevel.DANGER)
        })
    });
    
    //====================================================================================================
    // CLASS: VALIDATOR
    //====================================================================================================
    $.extend($.crigtt.validate, {
        "Validator": function (formElem) {
            this.formElem = formElem;
        }
    });
    
    $.extend($.crigtt.validate.Validator, {
        "CONTENT_TYPE_DATA_ENTRY_NAME": "crigtt.validate.data.contentType"
    });
    
    $.extend($.crigtt.validate.Validator.prototype, {
        "formElem": undefined,
        
        "resultPanel": function (resp, httpStatus, httpStatusText) {
            var id = resp.id;
            var submittedTimestamp = $.crigtt.format.timestamp(resp.submittedTimestamp);
            var doc = resp.document;
            var docHash = doc.hash;
            var results = resp.results;
            var events = results.events;
            var status = results.status;
            var panelHeadingElemId = "panel-heading-validator-result-" + id;
            var panelCollapseElemId = "panel-collapse-validator-result-" + id;
            var panelInfoTabPaneElemId = "tab-pane-validator-result-info-" + id;
            var panelErrorTabPaneElemId = "tab-pane-validator-result-error-" + id;
            var panelEventsTabPaneElemId = "tab-pane-validator-result-events-" + id;
            
            var panelElem = $("<div/>", {
                "class": "panel panel-" + (status ? $.crigtt.ui.UiEventLevel.SUCCESS : $.crigtt.ui.UiEventLevel.DANGER).value.classNameSuffix,
                "id": "panel-validator-result-" + id
            });
            
            var panelHeadingElem = $("<div/>", {
                "class": "panel-heading",
                "id": panelHeadingElemId,
                "role": "tab"
            });
            
            panelElem.append(panelHeadingElem);
            
            var panelTitleElem = $("<div/>", {
                "class": "panel-title"
            }).append(
                $("<a/>", {
                    "aria-controls": panelCollapseElemId,
                    "aria-expanded": true,
                    "data-parent": "#panel-group-validator-results",
                    "data-toggle": "collapse",
                    "href": "#" + panelCollapseElemId
                }).append(
                    $("<span/>").append($.crigtt.ui.icon("fa-" + (status ? "check" : "times"))),
                    $("<span/>").append(
                        $.crigtt.ui.strong("ID"), ": " + id,
                        $.crigtt.ui.br(),
                        $.crigtt.ui.strong("Submitted"), ": " + submittedTimestamp
                    )
                ),
                $("<span/>").append(
                    $.crigtt.ui.strong("Download"), ": ",
                    $("<button/>", {
                        "class": "btn btn-default"
                    }).data($.crigtt.validate.Validator.CONTENT_TYPE_DATA_ENTRY_NAME, $.crigtt.validate.ValidatorContentType.JSON).append(
                        $.crigtt.ui.icon("fa-file-text-o"), "JSON"
                    ),
                    $("<button/>", {
                        "class": "btn btn-default"
                    }).data($.crigtt.validate.Validator.CONTENT_TYPE_DATA_ENTRY_NAME, $.crigtt.validate.ValidatorContentType.XML).append(
                        $.crigtt.ui.icon("fa-file-code-o"), "XML"
                    )
                ).find("button.btn").click($.proxy(function (event) {
                    this.downloadResults.apply(this, [ docHash, $(event.target).data($.crigtt.validate.Validator.CONTENT_TYPE_DATA_ENTRY_NAME) ]);
                }, this)).end(),
                $("<span/>", {
                    "class": "pull-right text-muted"
                }).append($.crigtt.ui.icon("fa-times")).click(function () {
                    var panelElem = $(this).parents("div.panel");
                    var panelGroupElem = panelElem.parents("div.panel-group");
                    
                    panelElem.remove();
                    
                    if (!panelGroupElem.find("div.panel").length) {
                        panelGroupElem.prev("div#well-validator-results-empty").show();
                        
                        panelGroupElem.hide();
                    }
                })
            );
            
            panelHeadingElem.append(panelTitleElem);
            
            var panelCollapseElem = $("<div/>", {
                "aria-labelledby": panelHeadingElemId,
                "class": "collapse in panel-collapse",
                "id": panelCollapseElemId,
                "role": "tabpanel"
            });
            
            panelElem.append(panelCollapseElem);
            
            var panelBodyElem = $("<div/>", {
                "class": "panel-body"
            });
            
            panelCollapseElem.append(panelBodyElem);
            
            var panelContentElem = $("<div/>", {
                "role": "tabpanel"
            });
            
            panelBodyElem.append(panelContentElem);
            
            var panelTabsElem = $("<ul/>", {
                "class": "nav nav-tabs",
                "role": "tablist"
            });
            
            panelContentElem.append(panelTabsElem);
            
            var panelInfoTabElem = $("<li/>", {
                "role": "presentation"
            }).append(
                $("<a/>", {
                    "aria-controls": panelInfoTabPaneElemId,
                    "data-toggle": "tab",
                    "href": "#" + panelInfoTabPaneElemId,
                    "role": "tab"
                }).append($.crigtt.ui.icon("fa-info-circle"), String.LF, $.crigtt.ui.strong("Info"))
            );
            
            panelTabsElem.append(panelInfoTabElem);
            
            // TEMP: dev
            if (false) {
                var panelErrorTabElem = $("<li/>", {
                    "class": "active",
                    "role": "presentation"
                }).append(
                    $("<a/>", {
                        "aria-controls": panelErrorTabPaneElemId,
                        "data-toggle": "tab",
                        "href": "#" + panelErrorTabPaneElemId,
                        "role": "tab"
                    }).append($.crigtt.ui.icon("fa-exclamation-triangle"), String.LF, $.crigtt.ui.strong("Error"))
                );

                panelTabsElem.append(panelErrorTabElem);
            } else {
                var panelEventsTabElem = $("<li/>", {
                    "class": "active",
                    "role": "presentation"
                }).append(
                    $("<a/>", {
                        "aria-controls": panelEventsTabPaneElemId,
                        "data-toggle": "tab",
                        "href": "#" + panelEventsTabPaneElemId,
                        "role": "tab"
                    }).append($.crigtt.ui.icon("fa-comments-o"), String.LF, $.crigtt.ui.strong("Events"))
                );

                panelTabsElem.append(panelEventsTabElem);
            }
            
            var panelTabContentElem = $("<div/>", {
                "class": "tab-content"
            });
            
            panelContentElem.append(panelTabContentElem);
            
            var panelInfoTabPaneElem = $("<div/>", {
                "class": "tab-pane",
                "id": panelInfoTabPaneElemId,
                "role": "tabpanel"
            }).append(
                $("<ul/>").append(
                    $("<li/>").append($.crigtt.ui.strong("ID"), ": " + id),
                    $("<li/>").append($.crigtt.ui.strong("Submitted"), ": " + submittedTimestamp),
                    $("<li/>").append($.crigtt.ui.strong("Processed"), ": " + $.crigtt.format.timestamp(resp.processedTimestamp)),
                    $("<li/>").append($.crigtt.ui.strong("Document"), ": ", $("<ul/>").append(
                        $("<li/>").append($.crigtt.ui.strong("File Name"), ": " + doc.fileName),
                        $("<li/>").append($.crigtt.ui.strong("Hash (SHA-512)"), ": " + docHash)
                    ))
                )
            );
            
            panelTabContentElem.append(panelInfoTabPaneElem);
            
            // TEMP: dev
            if (false) {
                var panelErrorTabPaneElem = $("<div/>", {
                    "class": "active tab-pane",
                    "id": panelErrorTabPaneElemId,
                    "role": "tabpanel"
                }).append(
                    $("<h2/>").append($.crigtt.ui.icon("fa-exchange"), "HTTP Response"),
                    $.crigtt.ui.strong("Status Code"),
                    ": " + httpStatus,
                    $.crigtt.ui.br(),
                    $.crigtt.ui.strong("Status Text"),
                    ": " + httpStatusText
                );
                
                panelErrorTabPaneElem.append(
                    $("<h2/>").append($.crigtt.ui.icon("fa-bolt"), "Exception"),
                    $("<pre/>").text([ error.message].concat(error.stackTrace).join(String.LF))
                );

                panelTabContentElem.append(panelErrorTabPaneElem);
            } else {
                var panelEventsTableElem = $("<table/>", {
                    "class": "table table-bordered table-condensed table-hover"
                }).append(
                    $("<thead/>").append(
                        $("<tr/>").append(
                            $("<th/>").text("ID"),
                            $("<th/>").text("Status"),
                            $("<th/>").text("Schema"),
                            $("<th/>").text("Pattern"),
                            $("<th/>").text("Rule"),
                            $("<th/>").text("Assertion"),
                            $("<th/>").text("Level"),
                            $("<th/>").append("Location", $.crigtt.ui.br(), "(Line : Column)")
                        )
                    ),
                    $("<tbody/>").append(
                        $.map(events, function (event) {
                            var eventStatus = event.status;
                            var eventLevel = $.crigtt.validate.ValidatorEventLevel.get(event.level);
                            var eventLoc = event.location;
                            var eventSchema = event.schema;
                            var eventPattern = event.pattern;
                            var eventRule = event.rule;
                            var eventAssertion = event.assertion;
                            
                            return $("<tr/>", {
                                "class": (eventStatus ? $.crigtt.ui.UiEventLevel.SUCCESS : eventLevel.value.uiEventLevel).value.classNameSuffix
                            }).append(
                                $("<td/>").text((event.id)),
                                $("<td/>").text((eventStatus ? "Pass" : "Fail")),
                                $("<td/>").text(eventSchema.id),
                                $("<td/>").text(eventPattern.id),
                                $("<td/>").text(eventRule.id),
                                $("<td/>").append(eventAssertion.id,
                                    $("<span/>", {
                                        "class": "hidden popover-data"
                                    }).append(
                                        $("<span/>", {
                                            "class": "popover-data-title"
                                        }).append($.crigtt.ui.strong("Assertion")),
                                        $("<span/>", {
                                            "class": "popover-data-content"
                                        }).append(
                                            $("<ul/>").append(
                                                $("<li/>").append($.crigtt.ui.strong("ID"), ": " + eventAssertion.id),
                                                $("<li/>").append($.crigtt.ui.strong("Name"), ": " + eventAssertion.name),
                                                $("<li/>").append($.crigtt.ui.strong("Test"), ": ", $("<pre/>").text(eventAssertion.test)),
                                                $("<li/>").append($.crigtt.ui.strong("Description"), ": ", $("<pre/>").text(eventAssertion.text))
                                            )
                                        )
                                    )
                                ),
                                $("<td/>", {
                                    "class": "text-" + eventLevel.value.uiEventLevel.value.classNameSuffix
                                }).text(eventLevel.key),
                                $("<td/>").text((eventLoc.lineNumber + " : " + eventLoc.columnNumber))
                            ).find("td:has(span.popover-data)").popover({
                                "container": "body",
                                "content": function () {
                                    return $(this).find("span.popover-data span.popover-data-content").html();
                                },
                                "html": true,
                                "placement": "auto",
                                "title": function () {
                                    return $(this).find("span.popover-data span.popover-data-title").html();
                                },
                                "trigger": "hover"
                            }).end();
                        })
                    )
                );
                
                panelEventsTableElem.tablesorter({
                    "sortList": [
                        [0, 0]
                    ]
                });

                var panelEventsTabPaneElem = $("<div/>", {
                    "class": "active tab-pane",
                    "id": panelEventsTabPaneElemId,
                    "role": "tabpanel"
                }).append(panelEventsTableElem);
                
                panelTabContentElem.append(panelEventsTabPaneElem);
            }
            
            return panelElem;
        },
        
        "downloadResults": function (docHash, contentType) {
            this.validate(contentType, {
                "data": new FormData(this.formElem.get(0)),
                "process": function (resp, httpStatus, httpStatusText) {
                    var blob = new Blob([ JSON.stringify(resp) ], { "type": contentType.value.type });
                    
                    open(URL.createObjectURL(blob));
                }
            });
        },
        
        "validate": function (contentType, opts) {
            $.ajax((opts = $.extend({
                "accepts": contentType.value.type,
                "cache": false,
                "contentType": false,
                "dataType": contentType.value.dataType,
                "error": function (req) {
                    opts.process($.parseJSON(req.responseText), req.status, req.statusText);
                },
                "mimeType": this.formElem.attr("enctype"),
                "processData": false,
                "success": function (resp, respHttpStatusText, req) {
                    opts.process(resp, req.status, req.statusText);
                },
                "type": this.formElem.attr("method"),
                "url": this.formElem.attr("action") + "?_type=" + contentType.key.toLowerCase()
            }, opts)));
        }
    });
}(jQuery));
