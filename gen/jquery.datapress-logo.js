(function() {
  var DataPressLogo, TWOPI, almost_cosine, lightenDarkenColor, num, percentAdd, percentMul, percentSub, percentTween,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  TWOPI = 2 * Math.PI;

  almost_cosine = function(base) {
    return function(t) {
      var cos, x;
      cos = (1 - Math.cos(t * Math.PI)) / 2;
      x = (base * t) + (1 - base) * cos;
      Math.max(0, x);
      return Math.min(1, x);
    };
  };

  num = function(x) {
    return parseFloat(x.replace("%", ""));
  };

  percentMul = function(a, b) {
    return (num(a) * num(b)) + "%";
  };

  percentAdd = function(a, b) {
    return (num(a) + num(b)) + "%";
  };

  percentSub = function(a, b) {
    return (num(a) - num(b)) + "%";
  };

  percentTween = function(a, b, t) {
    return (num(a) * (1 - t) + num(b) * t) + "%";
  };

  lightenDarkenColor = function(col, amt) {
    var b, g, newColor, r;
    col = col.substr(1);
    col = parseInt(col, 16);
    r = Math.min(255, (col >> 16) + amt);
    b = Math.min(255, ((col >> 8) & 0x00FF) + amt);
    g = Math.min(255, (col & 0x0000FF) + amt);
    newColor = g | (b << 8) | (r << 16);
    return "#" + (newColor.toString(16));
  };

  DataPressLogo = (function() {
    DataPressLogo.prototype.defaults = {
      width: void 0,
      height: void 0,
      aspectRatio: 1333 / 1012,
      spinRadius: 20,
      spinCluster: 10,
      initial: "logo",
      fg: "#ec4255"
    };

    DataPressLogo.prototype.reds = [['-24.91%', '9.78%', '17.30%'], ['-1.41%', '-14.66%', '22.28%'], ['5.08%', '18.89%', '17.39%'], ['22.18%', '-1.88%', '17.39%'], ['28.20%', '15.70%', '12.22%']];

    DataPressLogo.prototype.whites = [['-26.04%', '10.34%', '2.35%'], ['-1.32%', '-12.97%', '5.72%'], ['5.08%', '18.42%', '5.72%'], ['21.71%', '-1.88%', '5.72%'], ['28.43%', '14.85%', '2.35%']];

    DataPressLogo.prototype.rect = [['-24.91%', '7.90%', '53.11%', '22.11%']];

    function DataPressLogo(el, options) {
      this.hoverOff = bind(this.hoverOff, this);
      this.hoverOn = bind(this.hoverOn, this);
      this.spinModeOff = bind(this.spinModeOff, this);
      this.spinModeOn = bind(this.spinModeOn, this);
      var dots, height, i, j, ref, svg, width, x;
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      if (this.options.width === void 0) {
        width = this.$el.width();
      }
      if (this.options.height === void 0) {
        height = width / this.options.aspectRatio;
      }
      svg = $("<svg width=\"" + width + "\" height=\"" + height + "\">").appendTo(this.$el);
      this.logo = d3.selectAll(svg).append("g").attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
      dots = (function() {
        var j, len, ref, results;
        ref = this.whites;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          x = ref[j];
          results.push(x.slice(0, 2));
        }
        return results;
      }).call(this);
      dots.unshift(["-40%", "-5%"]);
      dots.push(["40%", "5.2%"]);
      this.lines = [];
      for (i = j = 0, ref = dots.length - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.lines.push(dots[i].concat(dots[i + 1]));
      }
      this.logo.selectAll(".red").data(this.reds).enter().append("circle").classed("red", true).attr("fill", this.options.fg);
      this.logo.selectAll("rect").data(this.rect).enter().append("rect").attr("fill", this.options.fg);
      this.logo.selectAll(".white").data(this.whites).enter().append("circle").classed("white", true).attr("fill", "#fff");
      this.logo.selectAll("line").data(this.lines).enter().append("line").attr("stroke", "#fff");
      if (this.options.initial === "logo") {
        this.jumpToLogo();
      } else if (this.options.initial === "center") {
        this.jumpToCenter();
      } else {
        throw "Unrecognized initial state: " + this.options.initial;
      }
    }

    DataPressLogo.prototype.jumpToLogo = function() {
      this.logo.selectAll(".red").attr("cx", function(d) {
        return d[0];
      }).attr("cy", function(d) {
        return d[1];
      }).attr("r", function(d) {
        return d[2];
      });
      this.logo.selectAll("rect").attr("x", function(d) {
        return d[0];
      }).attr("y", function(d) {
        return d[1];
      }).attr("width", function(d) {
        return d[2];
      }).attr("height", function(d) {
        return d[3];
      });
      this.logo.selectAll(".white").attr("cx", function(d) {
        return d[0];
      }).attr("cy", function(d) {
        return d[1];
      }).attr("r", function(d) {
        return d[2];
      });
      return this.logo.selectAll("line").attr("x1", function(d) {
        return d[0];
      }).attr("y1", function(d) {
        return d[1];
      }).attr("x2", function(d) {
        return d[2];
      }).attr("y2", function(d) {
        return d[3];
      }).attr("stroke-width", "1.3%");
    };

    DataPressLogo.prototype.jumpToCenter = function() {
      this.logo.selectAll(".red").attr("cx", "0%").attr("cy", "0%").attr("r", "0%");
      this.logo.selectAll("rect").attr("x", "0%").attr("y", function(d) {
        return d[1];
      }).attr("width", "0%").attr("height", "0%");
      this.logo.selectAll(".white").attr("cx", function(d) {
        return d[0];
      }).attr("cy", function(d) {
        return "0%";
      }).attr("r", function(d) {
        return "0%";
      });
      return this.logo.selectAll("line").attr("x1", function(d) {
        return d[0];
      }).attr("y1", "0%").attr("x2", function(d) {
        return d[2];
      }).attr("y2", "0%").attr("stroke-width", "0%");
    };

    DataPressLogo.prototype.spinX = function(i, t, bias) {
      var radiusX;
      radiusX = this.options.spinRadius;
      return (radiusX * Math.sin((TWOPI * i / this.options.spinCluster) + (t * TWOPI) + bias)) + "%";
    };

    DataPressLogo.prototype.spinY = function(i, t, bias) {
      var radiusY;
      radiusY = (this.options.spinRadius * this.options.aspectRatio) + "%";
      return (-num(radiusY) * Math.cos((TWOPI * i / this.options.spinCluster) + (t * TWOPI) + bias)) + "%";
    };

    DataPressLogo.prototype.spinModeOn = function() {
      var time;
      time = this.doSpinner();
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      return this.timer = window.setTimeout(this.spinModeOn, time + 100);
    };

    DataPressLogo.prototype.spinModeOff = function() {
      window.clearTimeout(this.timer);
      this._redBounceOut(this.logo.selectAll(".red"), 0);
      this._whiteArrive(this.logo.selectAll(".white"), 0);
      this._lineArrive(this.logo.selectAll("line"), 0);
      return this._rectArrive(this.logo.selectAll("rect"), 0);
    };

    DataPressLogo.prototype.hoverOn = function() {
      var red;
      this.logo.selectAll(".red,rect").attr("fill", lightenDarkenColor(this.options.fg, 20));
      red = this.logo.selectAll(".red");
      red = this._redEngorge(red, 0);
      return red = this._redBounceOut(red, 100);
    };

    DataPressLogo.prototype.hoverOff = function() {
      return this.logo.selectAll(".red,rect").attr("fill", this.options.fg);
    };

    DataPressLogo.prototype.doSpinner = function(spins) {
      var delay, i, j, line, rect, red, ref, white;
      if (spins == null) {
        spins = 5;
      }
      delay = 100;
      red = this.logo.selectAll(".red");
      red = this._redToCircle(red, delay);
      delay += 400;
      for (i = j = 0, ref = spins; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        red = this._redSpin(red, delay);
        delay += 900;
      }
      red = this._redCentre(red, delay);
      delay += 800;
      red = this._redBounceOut(red, delay);
      delay += 1000;
      white = this.logo.selectAll(".white");
      white = this._whiteGo(white, 100);
      white = this._whiteArrive(white, delay - 800);
      line = this.logo.selectAll("line");
      line = this._lineGo(line, 100);
      line = this._lineArrive(line, delay - 800);
      rect = this.logo.selectAll("rect");
      rect = this._rectGo(rect, 0);
      rect = this._rectArrive(rect, delay - 1050);
      return delay;
    };

    DataPressLogo.prototype._rectGo = function(selection, delay) {
      return selection.transition().delay(delay).duration(250).attr("x", "0%").attr("width", "0%").attr("height", "0%");
    };

    DataPressLogo.prototype._rectArrive = function(selection, delay) {
      return selection.transition().delay(delay).duration(1000).attr("x", function(d) {
        return d[0];
      }).attr("width", function(d) {
        return d[2];
      }).attr("height", function(d) {
        return d[3];
      });
    };

    DataPressLogo.prototype._whiteGo = function(selection, delay) {
      return selection.transition().delay(delay).duration(200).attr("r", "0%").attr("cy", "0%");
    };

    DataPressLogo.prototype._whiteArrive = function(selection, delay) {
      return selection.transition().delay(function(d, i) {
        return delay + i * 100;
      }).duration(600).attr("r", function(d) {
        return d[2];
      }).attr("cy", function(d) {
        return d[1];
      }).ease("elastic");
    };

    DataPressLogo.prototype._lineGo = function(selection, delay) {
      return selection.transition().delay(delay).duration(100).attr("stroke-width", "0%").attr("y1", "0%").attr("y2", "0%");
    };

    DataPressLogo.prototype._lineArrive = function(selection, delay) {
      return selection.transition().delay(function(d, i) {
        return delay;
      }).duration(1000).attr("y1", function(d) {
        return d[1];
      }).attr("y2", function(d) {
        return d[3];
      }).attr("stroke-width", "1.3%").ease("elastic");
    };

    DataPressLogo.prototype._redToCircle = function(selection, delay) {
      var bias;
      if (delay == null) {
        delay = 0;
      }
      bias = function(t) {
        var rewind_a_bit, stay_still;
        stay_still = -t * TWOPI;
        rewind_a_bit = -(1 - t) / 3 * TWOPI;
        return stay_still + rewind_a_bit;
      };
      return selection.transition().delay(delay).attr("r", "5%").attrTween('cx', (function(_this) {
        return function(d, i, from) {
          return function(t) {
            return percentTween(from, _this.spinX(i, t, bias(t)), t);
          };
        };
      })(this)).attrTween('cy', (function(_this) {
        return function(d, i, from) {
          return function(t) {
            return percentTween(from, _this.spinY(i, t, bias(t)), t);
          };
        };
      })(this)).duration(400).ease('linear');
    };

    DataPressLogo.prototype._redSpin = function(selection, delay) {
      if (delay == null) {
        delay = 0;
      }
      return selection.transition().delay(delay).attrTween('cx', (function(_this) {
        return function(d, i) {
          return function(t) {
            return _this.spinX(i, t, 0);
          };
        };
      })(this)).attrTween('cy', (function(_this) {
        return function(d, i) {
          return function(t) {
            return _this.spinY(i, t, 0);
          };
        };
      })(this)).duration(900).ease("linear");
    };

    DataPressLogo.prototype._redCentre = function(selection, delay) {
      if (delay == null) {
        delay = 0;
      }
      return selection.transition().delay(delay).attrTween('cx', (function(_this) {
        return function(d, i) {
          return function(t) {
            return percentTween(_this.spinX(i, t, 0), "0%", t);
          };
        };
      })(this)).attrTween('cy', (function(_this) {
        return function(d, i) {
          return function(t) {
            return percentTween(_this.spinY(i, t, 0), "0%", t);
          };
        };
      })(this)).duration(2800).ease(function(t) {
        return Math.sin(t * Math.PI);
      });
    };

    DataPressLogo.prototype._redBounceOut = function(selection, delay) {
      if (delay == null) {
        delay = 0;
      }
      return selection.transition().ease("elastic").delay(function(d, i) {
        return delay + i * 50;
      }).duration(1000).attr("cx", function(d) {
        return d[0];
      }).attr("cy", function(d) {
        return d[1];
      }).attr("r", function(d) {
        return d[2];
      });
    };

    DataPressLogo.prototype._redEngorge = function(selection, delay) {
      return selection.transition().delay(function(d, i) {
        return delay + i * 50;
      }).duration(100).attr("r", function(d) {
        return (num(d[2]) * 1.08) + "%";
      });
    };

    DataPressLogo.prototype.redRipple = function() {
      var red;
      red = this.logo.selectAll(".red");
      red = this._redEngorge(red, 0);
      return red = this._redBounceOut(red, 100);
    };

    DataPressLogo.prototype.flatWhite = function() {
      var line, white;
      white = this.logo.selectAll(".white");
      white = white.transition().duration(400).attr("r", "0%").attr("cy", "0%").ease(almost_cosine(0.5));
      white = this._whiteArrive(white, 600);
      line = this.logo.selectAll("line");
      line = line.transition().duration(400).attr("y1", "0%").attr("y2", "0%").ease(almost_cosine(0.5));
      return line = this._lineArrive(line, 600);
    };

    DataPressLogo.prototype.intro1 = function() {
      var line, speed, white;
      speed = 1200;
      this.jumpToLogo();
      line = this.logo.selectAll("line");
      line.attr("y1", "0%").attr("y2", "0%").attr("stroke-width", "200%");
      line = line.transition().duration(speed).attr("stroke-width", "1.3%");
      line = this._lineArrive(line, speed);
      white = this.logo.selectAll(".white");
      white.attr("cy", "0%");
      white.attr("r", "100%");
      white = white.transition().duration(speed).attr("r", "0%");
      return white = this._whiteArrive(white, speed);
    };

    DataPressLogo.prototype.intro2 = function() {
      var delay, line, speed, white;
      speed = 1200;
      this.jumpToCenter();
      delay = this._redBounceOut(this.logo.selectAll(".red"), 0);
      this._rectArrive(this.logo.selectAll("rect"), 0);
      line = this.logo.selectAll("line").attr("opacity", 0).attr("x1", function(d) {
        return d[0];
      }).attr("y1", function(d) {
        return d[1];
      }).attr("x2", function(d) {
        return d[2];
      }).attr("y2", function(d) {
        return d[3];
      }).attr("stroke-width", "1.3%").transition().delay(700).duration(300).attr("opacity", 1);
      white = this.logo.selectAll(".white");
      white.attr("cy", "0%");
      return white = this._whiteArrive(white, 800);
    };

    return DataPressLogo;

  })();

  (function($, window) {
    return $.fn.extend({
      datapressLogo: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('datapressLogo');
          if (!data) {
            $this.data('datapressLogo', (data = new DataPressLogo(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });
  })(window.jQuery, window);

}).call(this);
