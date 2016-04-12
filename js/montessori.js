// Ui.App.extend('Test.App', {
//   constructor: function() {
//     var scroll = new Ui.ScrollingArea({ scrollHorizontal: false });
//     this.setContent(scroll);
//     var vbox = new Ui.VBox({ spacing: 20 });
//     scroll.setContent(vbox);
//     vbox.append(new Ui.Rectangle({ fill: 'lightgreen', height: 500 }));
//     var draggable = new Ui.Draggable({ draggableData: 'hello here', width: 64, height: 64, horizontalAlign: 'center' });
//     draggable.append(new Ui.Rectangle({ fill: 'lightblue', radius: 8 }));
//     draggable.append(new Ui.Label({ text: 'drag me', horizontalAlign: 'center', verticalAlign: 'center', margin: 10 }));
//     vbox.append(draggable);
//     vbox.append(new Ui.Rectangle({ fill: 'lightblue', height: 500 }));
//   }
// });
// new Test.App();


// var app = new Ui.App();
// var vbox = new Ui.VBox({ verticalAlign: 'center', horizontalAlign: 'center', spacing: 20 });
// app.setContent(vbox);
// Core.Object.extend('Test.Data');
// //
// // Define a draggable element. Choose a mimetype for the content. Most of the time
// // use an application specific mimetype. The mimetype is used between a drag element
// // and a drop element to see if they are compatible.
// //
// // Choose the data that are dragged and dropped. Here the string 'hello here'
// //
// // Put some content to see something
// //
// var draggable = new Ui.Draggable({ draggableData: new Test.Data(), width: 64, height: 64, horizontalAlign: 'center' });
// draggable.append(new Ui.Rectangle({ fill: 'lightblue', radius: 8 }));
// draggable.append(new Ui.Label({ text: 'drag me', horizontalAlign: 'center', verticalAlign: 'center', margin: 10 }));
// vbox.append(draggable);
// //
// // Connect to the dragstart event. This is not needed but might be usefull
// // to return some feedback to the user.
// //
// // Here, the opacity of the drag element is changed
// //
// app.connect(draggable, 'dragstart', function() {
//     draggable.setOpacity(0.5);
// });
// //
// // Connect to the dragend event. This is called when the drag is done.
// // operation let us known what has happened:
// //  - none: drag fails (drop no where)
// //  - copy: drag has negociated a copy of the element in a drop element
// //  - move: drag has negociated a move of the element in a drop element.
// //          in this case, the original element should be suppressed
// //
// app.connect(draggable, 'dragend', function(draggable, operation) {
//     if((operation == 'none') || (operation == 'copy'))
//         draggable.setOpacity(1);
//     if(operation == 'move')
//         draggable.setOpacity(0);
// });
// //
// // Define a DropBox. The DropBox is a possible target for a drag element.
// //
// var dropbox = new Ui.DropBox({ width: 200, height: 200 });
// dropbox.addType(Test.Data, 'copy');
// dropbox.addType('text/uri-list', 'copy');
// dropbox.addType('text', function(data) { return 'copy'; });
// // fill with content to see something
// dropBg = new Ui.Rectangle({ fill: 'lightgreen', radius: 8 });
// dropbox.append(dropBg);
// var droplabel = new Ui.Label({ text: 'drop here', horizontalAlign: 'center', verticalAlign: 'center', margin: 10 });
// dropbox.append(droplabel);
// vbox.append(dropbox);
// app.connect(dropbox, 'dragenter', function() {
//     dropBg.setFill('orange');
// });
// app.connect(dropbox, 'dragleave', function() {
//     dropBg.setFill('lightgreen');
// });
// //
// // Connect to the drop event called when a compatible element is
// // dropped in the box.
// //
// app.connect(dropbox, 'drop', function(dropbox, data, effect, x, y) {
//     if(Ui.DragNativeData.hasInstance(data)) {
//         if(data.hasType('text/uri-list'))
//             data = data.getData('text/uri-list');
//         else if(data.hasType('text/plain'))
//             data = data.getData('text/plain');
//     }
//     droplabel.setText('message: '+data);
//     new Core.DelayedTask({ delay: 1, callback: function() {
//         droplabel.setText('drop here');
//     }});
// });

var app = new Ui.App();

var fixed = new Ui.Fixed();
app.setContent(fixed);

var movable = new Ui.Movable({ inertia: true });
var lbox = new Ui.LBox();
lbox.append(new Ui.Rectangle({ width: 100, height: 100, fill: 'orange', radius: 8 }));
lbox.append(new Ui.Label({ text: 'free move' }));
movable.setContent(lbox);
fixed.append(movable, 0, 0);


movable = new Ui.Movable({ moveVertical: false, inertia: true });
lbox = new Ui.LBox();
lbox.append(new Ui.Rectangle({ width: 100, height: 100, fill: 'purple', radius: 8 }));
lbox.append(new Ui.Label({ text: 'horizontal' }));
movable.setContent(lbox);
fixed.append(movable, 0, 200);

movable = new Ui.Movable({ moveHorizontal: false });
lbox = new Ui.LBox();
lbox.append(new Ui.Rectangle({ width: 100, height: 100, fill: 'lightblue', radius: 8 }));
lbox.append(new Ui.Label({ text: 'vertical' }));
movable.setContent(lbox);
fixed.append(movable, 250);

movable = new Ui.Movable({ moveVertical: false });
lbox = new Ui.LBox();
lbox.append(new Ui.Rectangle({ width: 200, height: 100, fill: 'lightgreen', radius: 8 }));
lbox.append(new Ui.Label({ text: 'horizontal limited 0-100' }));
movable.setContent(lbox);
fixed.append(movable, 0, 400);
movable.connect(movable, 'move', function(movable) {
    if(movable.getPositionX() < 0)
        movable.setPosition(0, undefined);
    else if(movable.getPositionX() > 100)
        movable.setPosition(100, undefined);
});
