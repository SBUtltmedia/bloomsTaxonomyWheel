 var textpath = document.getElementById("tp");
        var path = document.getElementById("s3");
        var fontsize = 20;
        while ( (textpath.getComputedTextLength()*1.50) > path.getTotalLength())
        {
            fontsize -= 0.01;
            textpath.setAttribute("font-size", fontsize);
        }