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
    /// Encapsulates a single drag/drop operation between any number of drop sources\r\n\
    /// and any number of drop targets.\r\n\
    /// </summary>\r\n\
    public class DragDropper\r\n\
    {\r\n\
        /// <summary>\r\n\
        /// Specifies the unique name of this drag/drop operation. This is used during\r\n\
        /// the drag/drop operation to detect the contents of the drop.\r\n\
        /// </summary>\r\n\
        public string Name { get; set; }\r\n\
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
        /// This class may only be initialized from within this assembly. To use the\r\n\
        /// DragDropper class, refer to the <see cref=\"DragDropManager\" /> to create\r\n\
        /// a new instance of this class.\r\n\
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
        ..................\r\n\
}";
    };
})();