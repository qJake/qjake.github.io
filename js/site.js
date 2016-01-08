(function() {
    var icons = [
        {file: 'vs', name: 'Visual Studio'},
        {file: 'html5', name: 'HTML5'},
        {file: 'css3', name: 'CSS3'},
        {file: 'angular', name: 'Angular'},
        {file: 'less', name: 'LESS'},
        {file: 'bootstrap', name: 'Bootstrap'},
        {file: 'git', name: 'Git'},
        {file: 'github', name: 'GitHub'},
        {file: 'windows', name: 'Windows'},
        {file: 'powershell', name: 'PowerShell'},
        {file: 'sqlserver', name: 'SQL Server'},
        {file: 'msft', name: 'Microsoft'},
        {file: 'nodejs', name: 'Node.js'},
        {file: 'office', name: 'Office'},
        {file: 'onedrive', name: 'OneDrive / Azure'},
        {file: 'adobecc', name: 'Adobe CC'},
    ];
        
    $(function()
    {
        // Set container height to browser height
        // TODO: Re-apply when window size changes
        $(window).resize(function()
        {
            $('.full-height').height($(window).height());
        })
        $(window).resize();
        
        var scrollMsg = setTimeout(function()
        {
            // After a few moments, show the "Scroll" message
            $('#scrollmsg').addClass('active');
        }, 6500);
        
        // If they scroll, don't bother showing the message. And hide it if it's already there.
        $(document).scroll(function()
        {
           if (scrollMsg)
           {
               clearTimeout(scrollMsg);
               scrollMsg = null;
           }
           $('#scrollmsg').removeClass('active'); 
        });
        
        // Insert the icons in the icon area
        var iconArea = $('#icons div');
        for(var i = 0; i < icons.length; i++)
        {
            iconArea.append(
                $('<img />').attr('src', "images/icons/" + icons[i].file + ".png")
                            .attr('alt', icons[i].name)
                            .attr('title', icons[i].name)
            );
        }
    });
})();