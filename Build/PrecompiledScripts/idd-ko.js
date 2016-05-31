define(["knockout", "idd"], function (ko, idd) {
    ko.bindingHandlers.iddY = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var unwrappedY = ko.unwrap(value);

            var xBindings;
            if (!allBindings.has('iddX'))
                throw new Error("Please define iddX binding along with iddY");
            else
                xBindings = allBindings.get('iddX');
            var stroke = undefined;
            if (allBindings.has('iddStroke')) {
                var strokeBinding = allBindings.get('iddStroke');
                stroke = ko.unwrap(strokeBinding);
            }
            var unwrappedX = ko.unwrap(xBindings);
            var plotAttr = element.getAttribute("data-idd-plot");
            if (plotAttr != null) {
                if (typeof element.plot != 'undefined') {
                    var data = { x: unwrappedX, y: unwrappedY };
                    if (typeof stroke != 'undefined')
                        data.stroke = stroke;
                    element.plot.draw(data);
                }
                else { //the case when the element was not yet initialized and not yet bound to the logical entity (plot)
                    //storing the data in the DOM. it will be used by IDD during IDD-initializing of the dom element
                    var csvDataToDraw = "x y";
                    var len = unwrappedX.length;
                    for (var i = 0; i < len; i++) {
                        csvDataToDraw += "\n"+unwrappedX[i] + " " + unwrappedY[i];
                    }
                    element.innerHTML = csvDataToDraw;
                    
                    if (typeof stroke != 'undefined') {
                        //saving stroke color in the data-idd-style attribute: will be picked up by initialization
                        element.setAttribute("data-idd-style", "stroke: " + stroke);
                    }
                }
            }
        }
    };

    ko.bindingHandlers.iddAreaY1 = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var unwrappedY1 = ko.unwrap(value);

            var xBindings;
            if (!allBindings.has('iddX'))
                throw new Error("Please define iddX binding along with iddAreaY1");
            else
                xBindings = allBindings.get('iddX');
            var unwrappedX = ko.unwrap(xBindings);
            var y2Bindings;
            if (!allBindings.has('iddAreaY2'))
                throw new Error("Please define iddAreaY2 binding along with iddAreaY1");
            else
                y2Bindings = allBindings.get('iddAreaY2');
            var unwrappedY2 = ko.unwrap(y2Bindings);
            var fillBindings;
            var unwrappedFill;
            if (!allBindings.has('iddAreaFill'))
                unwrappedFill = undefined;
            else
                fillBindings = allBindings.get('iddAreaFill');
            var unwrappedFill = ko.unwrap(fillBindings);
            var plotAttr = element.getAttribute("data-idd-plot");
            if (plotAttr != null) {
                if (typeof element.plot !== 'undefined') {
                    var data = { x: unwrappedX, y1: unwrappedY1, y2: unwrappedY2 };
                    if (typeof unwrappedFill !== 'undefined')
                        data.fill = unwrappedFill;
                    element.plot.draw(data);
                }
                else { //the case when the element was not yet initialized and not yet bound to the logical entity (plot)
                    //storing the data in the DOM. it will be used by IDD during IDD-initializing of the dom element
                    var csvDataToDraw = "x y1 y2";
                    var len = unwrappedX.length;
                    for (var i = 0; i < len; i++) {
                        csvDataToDraw += "\n" + unwrappedX[i] + " " + unwrappedY1[i] + " " + unwrappedY2[i];
                    }
                    element.innerHTML = csvDataToDraw;

                    if (typeof unwrappedFill !== 'undefined') {
                        //saving stroke color in the data-idd-style attribute: will be picked up by initialization
                        element.setAttribute("data-idd-style", "fill: " + unwrappedFill);
                    }

                }
            }
        }
    };
    window.IntToColour = function (index) { //TODO: find other way to deliver the function to the KO komponent templates
        
        return colors[ko.unwrap(index)];
    };
});