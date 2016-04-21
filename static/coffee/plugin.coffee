# Note that to create an image for fallback, the image needs to be 125% canvas size of the trimmed cloud
#
TWOPI = 2*Math.PI
console.log "version 2"

almost_cosine = (base) -> (t) ->
    cos = (1 - Math.cos(t*Math.PI)) / 2 # 0 to 1
    x = (base * t) + ( 1 - base ) * cos
    Math.max 0, x
    Math.min 1, x

num = (x) -> parseFloat x.replace "%",""
percentMul = (a,b) -> "#{num(a)*num(b)}%"
percentAdd = (a,b) -> "#{num(a)+num(b)}%"
percentSub = (a,b) -> "#{num(a)-num(b)}%"
percentTween = (a,b,t) -> "#{num(a)*(1-t) + num(b)*t}%"

lightenDarkenColor = (col,amt) ->
    col = col.substr 1
    col = parseInt(col,16)
    r = Math.min 255, ((col >> 16) + amt)
    b = Math.min 255, (((col >> 8) & 0x00FF) + amt)
    g = Math.min 255, ((col & 0x0000FF) + amt)
    newColor = g | (b << 8) | (r << 16)
    return "##{newColor.toString(16)}"


class DataPressLogo

    defaults:
        width: undefined
        height: undefined
        aspectRatio: 1333/1012
        spinRadius: 20 # Percent
        spinCluster: 10 # Higher for more clustering of dots
        initial: "logo"
        fg: "#ec4255"
        bg: "#ffffff"

    reds: [
      [ '-24.91%' , '9.78%'   , '17.30%' ]
      [ '-1.41%'  , '-14.66%' , '22.28%' ]
      [ '5.08%'   , '18.89%'  , '17.39%' ]
      [ '22.18%'  , '-1.88%'  , '17.39%' ]
      [ '28.20%'  , '15.70%'  , '12.22%' ]
    ]

    whites: [
        [ '-26.04%' , '10.34%'  , '2.35%' ]
        [ '-1.32%'  , '-12.97%' , '5.72%' ]
        [ '5.08%'   , '18.42%'  , '5.72%' ]
        [ '21.71%'  , '-1.88%'  , '5.72%' ]
        [ '28.43%'  , '14.85%'  , '2.35%' ]
    ]

    rect: [
        [
          '-24.91%'
          '7.90%'
          '53.11%'
          '22.11%'
        ]
    ]

    constructor: (el, options) ->
        @options = $.extend({}, @defaults, options)
        @$el = $(el)
        if @options.width is undefined
            width = @$el.width()
        if @options.height is undefined
            height = width / @options.aspectRatio

        # Create the canvas & convert to d3
        if @$el.is("img")
            svg = $("<svg width=\"#{width}\" height=\"#{height}\">").insertBefore @$el
            @$el.remove()
        else
            svg = $("<svg width=\"#{width}\" height=\"#{height}\">").appendTo @$el

        @logo = d3.selectAll svg
            .append("g")
            .attr("transform","translate(#{width/2},#{height/2})")
        # -----------------------------------

        # Interpolate the data for the lines
        dots = ( x.slice(0,2) for x in @whites )
        dots.unshift [ "-40%","-5%" ] # First point
        dots.push [ "40%","5.2%" ]   # Last point
        @lines = []
        for i in [0...dots.length-1]
            @lines.push dots[i].concat dots[i+1]
        @logo.selectAll(".red")
            .data(@reds).enter()
                .append("circle")
                .classed("red",true)
                .attr("fill",@options.fg)
        @logo.selectAll("rect")
            .data(@rect)
            .enter().append("rect")
                .attr("fill",@options.fg)
        @logo.selectAll(".white")
            .data(@whites).enter()
                .append("circle")
                .classed("white",true)
                .attr("fill",@options.bg)
        @logo.selectAll("line")
            .data(@lines).enter()
                .append("line")
                .attr("stroke",@options.bg)
        if @options.initial=="logo"
            @jumpToLogo()
        else if @options.initial=="center"
            @jumpToCenter()
        else
            throw "Unrecognized initial state: #{@options.initial}"

    jumpToLogo: ->
        @logo.selectAll(".red")
            .attr("cx",(d) -> d[0])
            .attr("cy",(d) -> d[1])
            .attr("r",(d) -> d[2])
        @logo.selectAll("rect")
            .attr("x"      , (d)->d[0])
            .attr("y"      , (d)->d[1])
            .attr("width"  , (d)->d[2])
            .attr("height" , (d)->d[3])
        @logo.selectAll(".white")
            .attr("cx",(d) -> d[0])
            .attr("cy",(d) -> d[1])
            .attr("r",(d) -> d[2])
        @logo.selectAll("line")
            .attr("x1",(d)->d[0])
            .attr("y1",(d)->d[1])
            .attr("x2",(d)->d[2])
            .attr("y2",(d)->d[3])
            .attr("stroke-width","1.3%")

    jumpToCenter: ->
        @logo.selectAll(".red")
            .attr "cx","0%"
            .attr "cy","0%"
            .attr "r","0%"
        @logo.selectAll("rect")
            .attr "x"      , "0%"
            .attr "y"      , (d)->d[1]
            .attr "width"  , "0%"
            .attr "height" , "0%"
        @logo.selectAll(".white")
            .attr "cx",(d) -> d[0]
            .attr "cy",(d) -> "0%"
            .attr "r",(d) -> "0%"
        @logo.selectAll("line")
            .attr "x1",(d)->d[0]
            .attr "y1","0%"
            .attr "x2",(d)->d[2]
            .attr "y2","0%"
            .attr "stroke-width","0%"

    spinX: (i,t,bias) ->
        radiusX = @options.spinRadius
        "#{radiusX * Math.sin ((TWOPI*i/@options.spinCluster) + (t*TWOPI) + bias)}%"

    spinY: (i,t,bias) ->
        radiusY = "#{@options.spinRadius * @options.aspectRatio}%"
        "#{ - num(radiusY) * Math.cos ((TWOPI*i/@options.spinCluster) + (t*TWOPI) + bias)}%"

    spinModeOn: =>
        time = @doSpinner()
        if @timer
            window.clearTimeout @timer
        @timer = window.setTimeout @spinModeOn, time+100

    spinModeOff: =>
        window.clearTimeout @timer
        @_redBounceOut @logo.selectAll(".red"), 0
        @_whiteArrive @logo.selectAll(".white"), 0
        @_lineArrive @logo.selectAll("line"), 0
        @_rectArrive @logo.selectAll("rect"), 0

    hoverOn: =>
        @logo.selectAll(".red,rect")
            .attr("fill",lightenDarkenColor @options.fg,20 )
        red = @logo.selectAll(".red")
        red = @_redEngorge(red,0)
        red = @_redBounceOut(red,100)

    hoverOff: =>
        @logo.selectAll(".red,rect")
            .attr("fill",@options.fg)

    doSpinner: (spins=5) ->
        delay = 100
        red = @logo.selectAll(".red")
        red = @_redToCircle(red,delay) ; delay += 400
        for i in [0...spins]
            red = @_redSpin(red,delay) ; delay += 900
        red = @_redCentre(red,delay) ; delay += 800
        red = @_redBounceOut(red,delay) ; delay += 1000
        white = @logo.selectAll(".white")
        white = @_whiteGo(white,100)
        white = @_whiteArrive(white,delay-800)
        line = @logo.selectAll("line")
        line = @_lineGo(line,100)
        line = @_lineArrive(line,delay-800)
        rect = @logo.selectAll("rect")
        rect = @_rectGo(rect,0)
        rect = @_rectArrive(rect,delay-1050)
        return delay

    _rectGo: (selection,delay) ->
        selection.transition()
            .delay delay
            .duration 250
            .attr("x","0%")
            .attr("width","0%")
            .attr("height","0%")

    _rectArrive: (selection,delay) ->
        selection.transition()
            .delay delay
            .duration 1000
            .attr("x" , (d)->d[0])
            .attr("width" , (d)->d[2])
            .attr("height" , (d)->d[3])

    _whiteGo: (selection,delay) ->
        selection.transition()
            .delay delay
            .duration 200
            .attr("r","0%")
            .attr("cy","0%")

    _whiteArrive: (selection,delay) ->
        selection.transition()
            .delay (d,i) -> delay + i*100
            .duration 600
            .attr("r",(d) -> d[2])
            .attr("cy",(d) -> d[1])
            .ease "elastic"

    _lineGo: (selection,delay) ->
        selection.transition()
            .delay delay
            .duration 100
            .attr("stroke-width","0%")
            .attr("y1","0%")
            .attr("y2","0%")

    _lineArrive: (selection,delay) ->
        selection.transition()
            .delay (d,i) -> delay
            .duration 1000
            .attr("y1",(d)->d[1])
            .attr("y2",(d)->d[3])
            .attr("stroke-width","1.3%")
            .ease "elastic"

    _redToCircle: (selection, delay=0) ->
        bias = (t) ->
            stay_still = - t*TWOPI
            rewind_a_bit = - (1-t)/3 * TWOPI
            stay_still + rewind_a_bit
        return selection.transition()
            .delay delay
            .attr("r","5%")
            .attrTween 'cx', (d,i,from) => (t) => percentTween from, @spinX(i,t,bias(t)), t
            .attrTween 'cy', (d,i,from) => (t) => percentTween from, @spinY(i,t,bias(t)), t
            .duration 400
            .ease 'linear'

    _redSpin: (selection, delay=0) ->
        return selection.transition()
            .delay delay
            .attrTween 'cx', (d,i) => (t) => @spinX i,t,0
            .attrTween 'cy', (d,i) => (t) => @spinY i,t,0
            .duration 900
            .ease "linear"

    _redCentre: (selection, delay=0) ->
        return selection.transition()
            .delay delay
            .attrTween 'cx', (d,i) => (t) => percentTween @spinX(i,t,0), "0%", t
            .attrTween 'cy', (d,i) => (t) => percentTween @spinY(i,t,0), "0%", t
            .duration 2800
            .ease (t) -> Math.sin(t*Math.PI)

    _redBounceOut: (selection, delay=0) ->
        return selection.transition()
            .ease "elastic"
            .delay (d,i) -> delay + i*50
            .duration 1000
            .attr "cx",(d) -> d[0]
            .attr "cy",(d) -> d[1]
            .attr "r",(d) -> d[2]

    _redEngorge: (selection, delay) ->
        return selection.transition()
            .delay (d,i) -> delay + i*50
            .duration 100
            .attr "r",(d) -> "#{num(d[2])*1.08}%"

    redRipple: ->
        red = @logo.selectAll(".red")
        red = @_redEngorge(red,0)
        red = @_redBounceOut(red,100)

    flatWhite: ->
        white = @logo.selectAll(".white")
        white = white.transition()
            .duration 400
            .attr("r","0%")
            .attr("cy","0%")
            .ease almost_cosine 0.5
        white = @_whiteArrive(white,600)

        line = @logo.selectAll("line")
        line = line.transition()
            .duration 400
            .attr("y1","0%")
            .attr("y2","0%")
            .ease almost_cosine 0.5
        line = @_lineArrive(line,600)

    intro1: ->
        speed = 1200
        @jumpToLogo()
        line = @logo.selectAll("line")
        line.attr("y1","0%")
            .attr("y2","0%")
            .attr("stroke-width","200%")
        line = line.transition()
            .duration speed
            .attr("stroke-width","1.3%")
        line = @_lineArrive(line,speed)
        white = @logo.selectAll(".white")
        white.attr("cy","0%")
        white.attr("r","100%")
        white = white.transition()
            .duration speed
            .attr("r","0%")
        white = @_whiteArrive(white,speed)

    intro2: ->
        speed = 1200
        @jumpToCenter()
        delay = @_redBounceOut @logo.selectAll(".red"), 0
        @_rectArrive @logo.selectAll("rect"),0
        line = @logo.selectAll("line")
            .attr("opacity",0)
            .attr("x1",(d)->d[0])
            .attr("y1",(d)->d[1])
            .attr("x2",(d)->d[2])
            .attr("y2",(d)->d[3])
            .attr("stroke-width","1.3%")
            .transition()
            .delay(700)
            .duration(300)
            .attr("opacity",1)
        white = @logo.selectAll(".white")
        white.attr("cy","0%")
        white = @_whiteArrive(white,800)


(($, window) ->

    # Define the plugin
    $.fn.extend datapressLogo: (option, args...) ->
        @each ->
            $this = $(this)
            data = $this.data('datapressLogo')

            if !data
                $this.data 'datapressLogo', (data = new DataPressLogo(this, option))
            if typeof option == 'string'
                data[option].apply(data, args)

) window.jQuery, window


