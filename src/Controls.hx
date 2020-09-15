#if keep @:keep #end
class Controls {
	// Gamepad shortcuts
	public static var A = 88;
	public static var B = 67;
	public static var U = 38;
	public static var D = 40;
	public static var L = 37;
	public static var R = 39;
	public static var MOUSE = -1;
	// Mouse position
	public static var M = {x:0,y:0}
	
	static var k:Map<Int,Bool> = [];
	static var l:Map<Int,Bool> = [];
	
	/**
	 *	Starts listeners for controls
	**/
	public static function init() {
		document.addEventListener('keydown', (e) -> k.set(e.keyCode, true));
		document.addEventListener('keyup', (e) -> k.set(e.keyCode, false));
		CTX.canvas.onpointerdown = (e) -> k.set(-1,true);
		CTX.canvas.onpointerup = (e) -> k.set(-1,false);
		CTX.canvas.onpointermove = (e) -> M = {
			x: (e.offsetX / Game.zx).floor(),
			y: (e.offsetY / Game.zy).floor()
		}
	}

	/**
	 *	Check the state of a button
	**/
	public static function p(n:Int):Bool return k.exists(n) && k[n];
	
	/**
	 *	Check to see if a button was just pressed
	**/
	public static function jp(n:Int):Bool {
		if (!k.exists(n)) return false;
		if (!l.exists(n)) {
			l.set(n, k[n]);
			return k[n];
		}
		var o = l[n] != k[n] && k[n];
		l.set(n, k[n]);
		return o;
	}
}