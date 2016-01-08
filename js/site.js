(function() {
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
    });
})();