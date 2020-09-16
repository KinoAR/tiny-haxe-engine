// Generated by Haxe 4.0.5
(function ($hx_exports, $global) { "use strict";
var Controls = function() { };
Controls.init = function() {
	window.document.onkeydown = function(e) {
		Controls.k.h[e.keyCode] = true;
		return;
	};
	window.document.onkeyup = function(e1) {
		Controls.k.h[e1.keyCode] = false;
		return;
	};
	Game.ctx.canvas.onpointerdown = function(e2) {
		Controls.k.h[-1 - e2.button] = true;
		return;
	};
	Game.ctx.canvas.onpointerup = function(e3) {
		Controls.k.h[-1 - e3.button] = false;
		return;
	};
	Game.ctx.canvas.onpointermove = function(e4) {
		return Controls.M = { x : Math.floor(e4.offsetX / Game.zx), y : Math.floor(e4.offsetY / Game.zy)};
	};
	Game.ctx.canvas.ontouchstart = function(e5) {
		Controls.k.h[-1] = true;
		return;
	};
	Game.ctx.canvas.ontouchend = function(e6) {
		Controls.k.h[-1] = false;
		return;
	};
	Game.ctx.canvas.ontouchmove = function(e7) {
		return Controls.M = { x : Math.floor(e7.touches.item(0).clientX / Game.zx), y : Math.floor(e7.touches.item(0).clientY / Game.zy)};
	};
};
Controls.p = function(n) {
	if(Controls.k.h.hasOwnProperty(n)) {
		return Controls.k.h[n];
	} else {
		return false;
	}
};
Controls.jp = function(n) {
	if(!Controls.k.h.hasOwnProperty(n)) {
		return false;
	}
	if(!Controls.l.h.hasOwnProperty(n)) {
		Controls.l.h[n] = Controls.k.h[n];
		return Controls.k.h[n];
	}
	var o = Controls.l.h[n] != Controls.k.h[n] && Controls.k.h[n];
	Controls.l.h[n] = Controls.k.h[n];
	return o;
};
var DrawTools = function() { };
DrawTools.clr = function(col) {
	if(col != null) {
		DrawTools.frect(col,0,0,Game.w,Game.h);
	} else {
		Game.ctx.clearRect(0,0,Game.w,Game.h);
	}
};
DrawTools.circ = function(col,x,y,r,lw) {
	DrawTools.ls(col,lw);
	Game.ctx.arc(x,y,r,0,2 * Math.PI);
	Game.ctx.stroke();
};
DrawTools.frect = function(col,x,y,w,h) {
	Game.ctx.fillStyle = col;
	Game.ctx.fillRect(x,y,w,h);
};
DrawTools.ls = function(col,lw) {
	Game.ctx.lineWidth = lw != null ? lw : 1;
	Game.ctx.strokeStyle = col;
	Game.ctx.beginPath();
	return Game.ctx;
};
DrawTools.atl = function(id,x,y) {
	var a = Spr.atl.h[id];
	Game.ctx.drawImage(Spr.m.h[a.id],a.ox,a.oy,a.w,a.h,x,y,a.w,a.h);
};
var Game = $hx_exports["Game"] = function() { };
Game.init = function(p,_w,_h) {
	window.document.oncontextmenu = function(e) {
		return e.preventDefault();
	};
	var c = window.document.createElement("canvas");
	var el = window.document.getElementById(p);
	el.appendChild(c);
	Game.w = c.width = _w;
	Game.h = c.height = _h;
	Game.ctx = c.getContext("2d",null);
	Controls.init();
	window.onresize = function(e1) {
		Game.zx = el.offsetWidth / _w;
		return Game.zy = el.offsetHeight / _h;
	};
	window.onresize();
	window.requestAnimationFrame(Game.loop);
	Main.main();
};
Game.loop = function(e) {
	Game.t = e;
	Game.s.update();
	Game.s.draw();
	window.requestAnimationFrame(Game.loop);
};
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
var Main = function() { };
Main.main = function() {
	Game.s = new MyScene();
};
var MyScene = function() {
	this.p = [];
	Spr.l("s.png",0);
	Spr.a(0,0,0,0,8,8);
	Spr.a(1,0,8,0,8,8);
	Spr.a(2,0,16,0,8,8);
	Spr.a(3,0,24,0,8,8);
};
MyScene.prototype = {
	update: function() {
		var _g = 0;
		var _g1 = this.p;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.x += o.dx;
			o.y += o.dy;
			if(o.x + 10 > Game.w && o.dx > 0 || o.x < 0 && o.dx < 0) {
				o.dx *= -1;
			}
			if(o.y + 10 > Game.h && o.dy > 0 || o.y < 0 && o.dy < 0) {
				o.dy *= -1;
			}
		}
		if(Controls.p(-1)) {
			this.p.push({ id : this.p.length % 4, x : Controls.M.x - 4, y : Controls.M.y - 4, dx : Math.random() - 0.5, dy : Math.random() - 0.5});
		}
		if(Controls.p(-3)) {
			var _g2 = 0;
			var _g3 = this.p;
			while(_g2 < _g3.length) {
				var o1 = _g3[_g2];
				++_g2;
				if(Math.abs(o1.x - Controls.M.x) < 8 && Math.abs(o1.y - Controls.M.y) < 8) {
					HxOverrides.remove(this.p,o1);
				}
			}
		}
		if(Controls.p(88)) {
			var _g21 = 0;
			var _g31 = this.p;
			while(_g21 < _g31.length) {
				var o2 = _g31[_g21];
				++_g21;
				o2.dx *= 0.9;
				o2.dy *= 0.9;
			}
		}
		if(Controls.jp(67)) {
			var _g22 = 0;
			var _g32 = this.p;
			while(_g22 < _g32.length) {
				var o3 = _g32[_g22];
				++_g22;
				o3.dx = Math.random() - 0.5;
				o3.dy = Math.random() - 0.5;
			}
		}
		if(Controls.jp(83)) {
			Save.s("test",{ p : this.p});
		}
		if(Controls.jp(76)) {
			var l = Save.l("test");
			this.p = l == null ? [] : l.p;
		}
	}
	,draw: function() {
		DrawTools.clr("black");
		if(Controls.p(-3)) {
			DrawTools.circ("red",Controls.M.x,Controls.M.y,8,4);
		}
		var _g = 0;
		var _g1 = this.p;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			DrawTools.atl(o.id,Math.round(o.x),Math.round(o.y));
		}
	}
};
var Save = function() { };
Save.s = function(s,d) {
	if(js_Browser.getLocalStorage() == null) {
		return false;
	}
	js_Browser.getLocalStorage().setItem(s,JSON.stringify(d));
	return true;
};
Save.l = function(s) {
	if(js_Browser.getLocalStorage() == null) {
		return null;
	}
	return JSON.parse(js_Browser.getLocalStorage().getItem(s));
};
var Spr = function() { };
Spr.l = function(src,id) {
	var d = window.document.createElement("div");
	d.style.display = "none";
	window.document.body.appendChild(d);
	var s = window.document.createElement("img");
	s.src = src;
	d.appendChild(s);
	Spr.m.h[id] = s;
};
Spr.a = function(id,sid,ox,oy,w,h) {
	Spr.atl.h[id] = { id : sid, ox : ox, oy : oy, w : w, h : h};
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
var js_Browser = function() { };
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( e ) {
		return null;
	}
};
Controls.M = { x : 0, y : 0};
Controls.k = new haxe_ds_IntMap();
Controls.l = new haxe_ds_IntMap();
Spr.m = new haxe_ds_IntMap();
Spr.atl = new haxe_ds_IntMap();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {});
