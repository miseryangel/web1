$(document).ready(function(){
    var entries = [
        {label:'float-link'},
        {label:'HTML'},
        {label:'HTML'},
        {label:'HTML'},
        {label:'HTML'},
        { label:'Back to top', url:'https://www.jqueryscript.net/tags.php?/Back%20to%20top/', target:'_top' },
    ];

    var settings = {
        entries: entries,
        width: 640,
        height: 480,
        radius: '65%',
        radiusMin: 75,
        bgDraw: true,
        bgColor: '#000',
        opacityOver: 1.00,
        opacityOut: 1.00,
        opacitySpeed: 6,
        fov: 800,
        speed: 2,
        fontFamily: 'Courier, Arial, sans-serif',
        fontColor: '#f00',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSretch: 'normal',
        fontToUpperCase: true,
    };
    $('#tag-cloud').svg3DTagCloud(settings);
});

$(document).ready(function(
    var entries = [ 

        { label: 'Back to top', url: 'https://www.jqueryscript.net/tags.php?/Back%20to%20top/', target: '_top' },
        { label: '<a href="https://www.jqueryscript.net/tags.php?/Bootstrap/">Bootstrap</a>', url: 'https://www.jqueryscript.net/tags.php?/Bootstrap/', target: '_top' },
        { label: '<a href="https://www.jqueryscript.net/tags.php?/Carousel/">Carousel</a>', url: 'https://www.jqueryscript.net/tags.php?/carousel/', target: '_top' },
        { label: 'Countdown', url: 'https://www.jqueryscript.net/tags.php?/countdown/', target: '_top' },
        { label: 'Dropdown <a href="https://www.jqueryscript.net/menu/">Menu</a>', url: 'https://www.jqueryscript.net/tags.php?/Drop%20Down%20Menu/', target: '_top' }
    
    ];
    $('#tag-cloud').svg3DTagCloud();
){})