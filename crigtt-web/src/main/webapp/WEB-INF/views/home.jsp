<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="spring-form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@page contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8" %>
<spring:url var="urlBase" value="/" scope="request"/>
<c:set var="urlStatic" value="${urlBase}static" scope="request"/>
<c:set var="urlStaticImages" value="${urlStatic}/images" scope="request"/>
<c:set var="urlStaticScripts" value="${urlStatic}/scripts" scope="request"/>
<c:set var="urlStaticStyles" value="${urlStatic}/styles" scope="request"/>
<c:set var="urlWebjarsLocator" value="${urlBase}webjars-locator" scope="request"/>
<c:set var="urlWebjarsLocatorBootstrap" value="${urlWebjarsLocator}/bootstrap" scope="request"/>
<c:set var="urlWebjarsLocatorFontAwesome" value="${urlWebjarsLocator}/font-awesome" scope="request"/>
<c:set var="urlWebjarsLocatorJquery" value="${urlWebjarsLocator}/jquery" scope="request"/>
<c:set var="urlWebjarsLocatorJqueryUi" value="${urlWebjarsLocator}/jquery-ui" scope="request"/>
<c:set var="urlWebjarsLocatorJqueryUiThemes" value="${urlWebjarsLocator}/jquery-ui-themes" scope="request"/>
<c:set var="urlWebjarsLocatorMoment" value="${urlWebjarsLocator}/moment" scope="request"/>
<c:set var="urlWebjarsLocatorTablesorter" value="${urlWebjarsLocator}/tablesorter" scope="request"/>
<c:set var="urlService" value="${urlBase}service" scope="request"/>
<c:set var="urlServiceValidator" value="${urlService}/validator" scope="request"/>
<c:set var="urlServiceValidatorValidate" value="${urlServiceValidator}/validate" scope="request"/>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <link type="image/png" rel="icon" href="${urlStaticImages}/crigtt-logo-16x16.png"/>
        <link type="text/css" rel="stylesheet" href="${urlWebjarsLocatorJqueryUiThemes}/smoothness/jquery-ui.min.css"/>
        <link type="text/css" rel="stylesheet" href="${urlWebjarsLocatorBootstrap}/css/bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="${urlWebjarsLocatorFontAwesome}/css/font-awesome.min.css"/>
        <link type="text/css" rel="stylesheet" href="${urlWebjarsLocatorTablesorter}/dist/css/theme.bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="${urlStaticStyles}/crigtt.css"/>
        <script type="text/javascript" src="${urlWebjarsLocatorJquery}/jquery.min.js"></script>
        <script type="text/javascript" src="${urlWebjarsLocatorJqueryUi}/jquery-ui.min.js"></script>
        <script type="text/javascript" src="${urlWebjarsLocatorBootstrap}/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="https://cdn.rawgit.com/adrai/enum/master/enum-2.1.0.min.js"></script>
        <script type="text/javascript" src="${urlWebjarsLocatorMoment}/min/moment.min.js"></script>
        <script type="text/javascript" src="${urlWebjarsLocatorTablesorter}/dist/js/jquery.tablesorter.combined.min.js"></script>
        <script type="text/javascript" src="${urlStaticScripts}/crigtt.js"></script>
        <script type="text/javascript" src="${urlStaticScripts}/crigtt-format.js"></script>
        <script type="text/javascript" src="${urlStaticScripts}/crigtt-ui.js"></script>
        <script type="text/javascript" src="${urlStaticScripts}/crigtt-validate.js"></script>
        <title><spring:message code="crigtt.msg.title.home"/></title>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="#" class="navbar-brand">
                        <img src="${urlStaticImages}/crigtt-logo-32x32.png" alt="CRIGTT Logo"/>
                        <strong><spring:message code="crigtt.msg.header.home"/></strong>
                    </a>
                </div>
                <ul class="nav navbar-nav nav-tabs" role="tablist">
                    <li class="active" role="presentation">
                        <a href="#content-tab-home" aria-controls="content-tab-home" role="tab" data-toggle="tab">
                            <i class="fa fa-home"></i>
                            <strong>Home</strong>
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#content-tab-validator" aria-controls="content-tab-validator" role="tab" data-toggle="tab">
                            <i class="fa fa-check-circle-o"></i>
                            <strong>Validator</strong>
                        </a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a class="link" data-toggle="dropdown">
                            <i class="fa fa-fw fa-gears"></i>
                            <strong>About</strong>
                            <span class="fa fa-fw fa-caret-down"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li role="presentation">
                                <a role="menuitem" tabindex="-1" target="_blank" href="https://github.com/esacinc/crigtt">
                                    <i class="fa fa-fw fa-github"></i>
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div id="content" class="container-fluid">
            <div id="content-tabs" class="tab-content">
                <div id="content-tab-home" class="tab-pane active" role="tabpanel">
                    <!-- TODO: implement -->
                </div>
                <div id="content-tab-validator" class="tab-pane" role="tabpanel">
                    <h1>
                        <i class="fa fa-fw fa-check-circle-o"></i>
                        <strong>Submit</strong>
                    </h1>
                    <form id="form-validator" name="form-validator" action="${urlServiceValidatorValidate}" enctype="multipart/form-data" method="post">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <span id="btn-file-doc" class="btn btn-default">
                                        <i class="fa fa-fw fa-folder-open-o"></i>
                                        Select File
                                        <input id="input-file-doc" name="documentFile" type="file"/>
                                    </span>
                                </span>
                                <input id="input-file-doc-display" class="form-control" type="text" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="btn-group btn-group-sm">
                                <button id="btn-validator-upload" class="btn btn-default form-control" disabled="disabled" type="submit" data-toggle="tooltip"
                                    data-placement="top">
                                    <i class="fa fa-fw fa-upload"></i>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </form>
                    <h1>
                        <i class="fa fa-fw fa-table"></i>
                        <strong>Results</strong>
                    </h1>
                    <div id="well-validator-results-processing" class="text-muted well well-sm">
                        <i class="fa fa-fw fa-spinner fa-spin"></i>
                        <strong><em>Processing</em></strong>
                    </div>
                    <div id="well-validator-results-empty" class="text-muted well well-sm">
                        <strong><em>None</em></strong>
                    </div>
                    <div id="panel-group-validator-results" class="panel-group" aria-multiselectable="true" role="tablist"></div>
                </div>
            </div>
        </div>
    </body>
</html>