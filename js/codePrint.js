(function() {
    
    var speed = 25;

    var currentIndex = 0;
    var codeContainer = $('<pre />');
    var contents = getCodeToPrint();
    var timer = null;

    $(function()
    {
        $('#codebg').append(codeContainer);
        timer = setInterval(writeCharacter, speed);
    });
    
    function writeCharacter()
    {
        codeContainer.append(document.createTextNode(contents[currentIndex++]));
        codeContainer.scrollTop(codeContainer[0].scrollHeight);
        if(currentIndex >= contents.length && timer)
        {
            clearInterval(timer);
        }
    }

    // This stores the code to print on the site in a global variable.
    function getCodeToPrint()
    {
        return "// Source: https://github.com/qJake/molten-core/blob/master/Molten.Core.Wpf/DragDrop/DragDropper.cs\r\n\
\r\n\
using System;\r\n\
using System.Collections.Generic;\r\n\
using System.Linq;\r\n\
using System.Windows;\r\n\
using System.Windows.Input;\r\n\
\r\n\
namespace Molten.Core.Wpf.DragDrop\r\n\
{\r\n\
    /// <summary>\r\n\
    /// Encapsulates a single drag/drop operation between any number of drop sources and any number of drop targets.\r\n\
    /// </summary>\r\n\
    public class DragDropper\r\n\
    {\r\n\
        /// <summary>\r\n\
        /// Specifies the unique name of this drag/drop operation. This is used during the drag/drop operation to detect the contents of the drop.\r\n\
        /// </summary>\r\n\
        public string Name { get; set; }\r\n\
\r\n\
        /// <summary>\r\n\
        /// Occurs when the drop event is fired on a valid target. The parameters are: package, source, target.\r\n\
        /// </summary>\r\n\
        public event Action<DropEventArgs> Drop;\r\n\
\r\n\
        /// <summary>\r\n\
        /// Occurs when the drag event starts. The UIElement parameter is the source (to match it with the source in the DragDropper) and the object is the package to include.\r\n\
        /// </summary>\r\n\
        public event Action<DragStartEventArgs> DragStart;\r\n\
\r\n\
        /// <summary>\r\n\
        /// Occurs when trying to drop a source onto a target. The \"AllowDrop\" property in the DropEventArgs dictates if the drop will occur or be cancelled.\r\n\
        /// </summary>\r\n\
        public event Action<DropEventArgs> CanDrop;\r\n\
\r\n\
        /// <summary>\r\n\
        /// Occurs if the result of CanDrop is true, when a source is dragged over this target.\r\n\
        /// </summary>\r\n\
        public event Action DragEnter;\r\n\
\r\n\
        /// <summary>\r\n\
        /// Occurs if the result of CanDrop is true, when a source is dragged away from this target.\r\n\
        /// </summary>\r\n\
        public event Action DragLeave;\r\n\
\r\n\
        private List<UIElement> Sources { get; set; }\r\n\
        private List<UIElement> Targets { get; set; }\r\n\
        private UIElement currentSource;\r\n\
        private bool IsMouseDetecting;\r\n\
        private bool IsDragging;\r\n\
        private Point StartPoint;\r\n\
\r\n\
        #region Constructors\r\n\
\r\n\
        /// <summary>\r\n\
        /// Initializes a new instance of the DragDropper class.\r\n\
        /// \r\n\
        /// This class may only be initialized from within this assembly. To use the DragDropper class, refer to the <see cref=\"DragDropManager\" />\r\n\
        /// to create a new instance of this class.\r\n\
        /// </summary>\r\n\
        /// <param name=\"name\">The unique name of this DragDropper (to distinguish multiple drag/drop events).</param>\r\n\
        internal DragDropper(string name)\r\n\
        {\r\n\
            Name = name;\r\n\
            Sources = new List<UIElement>();\r\n\
            Targets = new List<UIElement>();\r\n\
        }\r\n\
\r\n\
        #endregion\r\n\
\r\n\
        /// <summary>\r\n\
        /// Determines whether or not this DragDropper is ready to perform drag/drop actions.\r\n\
        /// </summary>\r\n\
        /// <returns>True if this class is ready to perform drag/drop operations, otherwise false.</returns>\r\n\
        public bool IsInitialized()\r\n\
        {\r\n\
            return (Sources.Count > 0 && Targets.Count > 0 && !string.IsNullOrWhiteSpace(Name));\r\n\
        }\r\n\
\r\n\
        /// <summary>\r\n\
        /// Adds a valid source drag target.\r\n\
        /// </summary>\r\n\
        /// <param name=\"source\">The draggable source element.</param>\r\n\
        public void AddSource(UIElement source)\r\n\
        {\r\n\
            source.PreviewMouseLeftButtonDown += Source_MouseDown;\r\n\
            source.MouseMove += Source_MouseMove;\r\n\
            source.PreviewMouseLeftButtonUp += Source_MouseUp;\r\n\
            Sources.Add(source);\r\n\
        }\r\n\
\r\n\
        /// <summary>\r\n\
        /// Removes a valid source drag target.\r\n\
        /// </summary>\r\n\
        /// <param name=\"source\">The source to remove.</param>\r\n\
        public void RemoveSource(UIElement source)\r\n\
        {\r\n\
            source.PreviewMouseLeftButtonDown -= Source_MouseDown;\r\n\
            source.MouseMove -= Source_MouseMove;\r\n\
            source.PreviewMouseLeftButtonUp -= Source_MouseUp;\r\n\
            Sources.Remove(source);\r\n\
        }\r\n\
\r\n\
        /// <summary>\r\n\
        /// Adds a valid drop target.\r\n\
        /// </summary>\r\n\
        /// <param name=\"target\">The element which can accept any of the specified <see cref=\"Sources\" /> during a drop operation.</param>\r\n\
        public void AddTarget(UIElement target)\r\n\
        {\r\n\
            target.DragEnter += Target_DragEnter;\r\n\
            target.DragLeave += Target_DragLeave;\r\n\
            target.DragOver += Target_DragOver;\r\n\
            target.Drop += Target_Drop;\r\n\
            target.AllowDrop = true;\r\n\
            Targets.Add(target);\r\n\
        }\r\n\
\r\n\
        /// <summary>\r\n\
        /// Removes the specified drop target from the list of valid drop targets.\r\n\
        /// </summary>\r\n\
        /// <param name=\"target\">The specified element to remove from the list of drop targets.</param>\r\n\
        public void RemoveTarget(UIElement target)\r\n\
        {\r\n\
            target.DragEnter -= Target_DragEnter;\r\n\
            target.DragLeave -= Target_DragLeave;\r\n\
            target.DragOver -= Target_DragOver;\r\n\
            target.Drop -= Target_Drop;\r\n\
            target.AllowDrop = false;\r\n\
            Targets.Remove(target);\r\n\
        }\r\n\
\r\n\
        #region Source Events\r\n\
\r\n\
        private void Source_MouseDown(object s, MouseEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                StartPoint = e.GetPosition(null);\r\n\
                IsMouseDetecting = true;\r\n\
            }\r\n\
        }\r\n\
\r\n\
        private void Source_MouseMove(object s, MouseEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                if (!IsDragging)\r\n\
                {\r\n\
                    if (IsMouseDetecting)\r\n\
                    {\r\n\
                        // Get the current mouse position\r\n\
                        Point mousePos = e.GetPosition(null);\r\n\
                        Vector diff = StartPoint - mousePos;\r\n\
\r\n\
                        if (e.LeftButton == MouseButtonState.Pressed &&\r\n\
                            Math.Abs(diff.X) > SystemParameters.MinimumHorizontalDragDistance ||\r\n\
                            Math.Abs(diff.Y) > SystemParameters.MinimumVerticalDragDistance)\r\n\
                        {\r\n\
                            DragStartEventArgs ea = new DragStartEventArgs();\r\n\
\r\n\
                            // Invoke the DragStart event on the source to allow it to set the package contents.\r\n\
                            DragStart.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
\r\n\
                            DataObject dragData = new DataObject(Name, ea.Package);\r\n\
\r\n\
                            IsMouseDetecting = false;\r\n\
                            IsDragging = true;\r\n\
                            currentSource = s as UIElement;\r\n\
\r\n\
                            // This blocks until the drop operation completes.\r\n\
                            System.Windows.DragDrop.DoDragDrop((s as UIElement), dragData, DragDropEffects.Move | DragDropEffects.None);\r\n\
\r\n\
                            IsDragging = false;\r\n\
                            currentSource = null;\r\n\
                        }\r\n\
                    }\r\n\
                }\r\n\
            }\r\n\
        }\r\n\
\r\n\
        private void Source_MouseUp(object s, MouseEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                // Handle the case where the user depresses the mouse button, moves less than SystemParameters.Minimum*DragDistance and then releases the mouse button.\r\n\
                IsMouseDetecting = false;\r\n\
                IsDragging = false;\r\n\
                currentSource = null;\r\n\
            }\r\n\
        }\r\n\
\r\n\
        #endregion\r\n\
\r\n\
        #region Target Events\r\n\
\r\n\
        private void Target_DragEnter(object s, DragEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                if (IsDragging)\r\n\
                {\r\n\
                    e.Handled = true;\r\n\
                    DropEventArgs ea = new DropEventArgs()\r\n\
                    {\r\n\
                        Package = e.Data.GetData(Name),\r\n\
                        Source = currentSource\r\n\
                    };\r\n\
\r\n\
                    CanDrop.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
\r\n\
                    if (ea.AllowDrop)\r\n\
                    {\r\n\
                        DragEnter.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke();\r\n\
                    }\r\n\
                }\r\n\
            }\r\n\
        }\r\n\
\r\n\
        private void Target_DragOver(object s, DragEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                if (IsDragging)\r\n\
                {\r\n\
                    e.Handled = true;\r\n\
\r\n\
                    DropEventArgs ea = new DropEventArgs()\r\n\
                    {\r\n\
                        Package = e.Data.GetData(Name),\r\n\
                        Source = currentSource\r\n\
                    };\r\n\
\r\n\
                    CanDrop.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
\r\n\
                    if (ea.AllowDrop)\r\n\
                    {\r\n\
                        e.Effects = DragDropEffects.Move;\r\n\
                    }\r\n\
                    else\r\n\
                    {\r\n\
                        e.Effects = DragDropEffects.None;\r\n\
                    }\r\n\
                }\r\n\
            }\r\n\
        }\r\n\
\r\n\
        private void Target_DragLeave(object s, DragEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                if (IsDragging)\r\n\
                {\r\n\
                    e.Handled = true;\r\n\
                    DropEventArgs ea = new DropEventArgs()\r\n\
                    {\r\n\
                        Package = e.Data.GetData(Name),\r\n\
                        Source = currentSource\r\n\
                    };\r\n\
\r\n\
                    CanDrop.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
\r\n\
                    if (ea.AllowDrop)\r\n\
                    {\r\n\
                        DragLeave.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke();\r\n\
                    }\r\n\
                }\r\n\
            }\r\n\
        }\r\n\
\r\n\
        private void Target_Drop(object s, DragEventArgs e)\r\n\
        {\r\n\
            if (IsInitialized())\r\n\
            {\r\n\
                if (IsDragging)\r\n\
                {\r\n\
                    e.Handled = true;\r\n\
                    if (e.Data.GetDataPresent(Name))\r\n\
                    {\r\n\
                        DropEventArgs ea = new DropEventArgs()\r\n\
                        {\r\n\
                            Package = e.Data.GetData(Name),\r\n\
                            Source = currentSource\r\n\
                        };\r\n\
\r\n\
                        // Invoke the CanDrop event again to ask the target if we're allowed to drop\r\n\
                        CanDrop.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
\r\n\
                        if (ea.AllowDrop)\r\n\
                        {\r\n\
                            Drop.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke(ea);\r\n\
                            // Also fire DragLeave since the system won't do this for us.\r\n\
                            DragLeave.GetInvocationList().Where(d => d.Target == s).First().DynamicInvoke();\r\n\
                        }\r\n\
                    }\r\n\
                }\r\n\
            }\r\n\
        }\r\n\
\r\n\
        #endregion\r\n\
    }\r\n\
}";
    };
})();