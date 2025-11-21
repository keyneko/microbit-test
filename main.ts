/**
 * Magic WS2812 RGB Effects
 */
//% color="#FF99CC" icon="\uf0eb"
//% block="Magic WS2812"
namespace ws2812Magic {

    let strip: neopixel.Strip = null;
    let length = 10;

    /**
     * 初始化灯条
     */
    //% block="init WS2812 on pin $pin with $count LEDs"
    //% pin.defl=DigitalPin.P0
    //% count.defl=10 count.min=1 count.max=240
    export function init(pin: DigitalPin, count: number) {
        length = count;
        strip = neopixel.create(pin, count, NeoPixelMode.RGB);
        strip.clear();
        strip.show();
    }

    /**
     * 显示颜色（可使用 colorNumberPicker）
     */
    //% block="show color $color"
    //% color.shadow="colorNumberPicker"
    export function showColor(color: number) {
        if (!strip) return;

        strip.showColor(color);
    }

    /**
     * 彩虹特效
     */
    //% block="rainbow"
    export function rainbow() {
        if (!strip) return;

        strip.showRainbow(1, 360);
    }

    /**
     * 呼吸灯（白光）
     */
    //% block="breathing"
    export function breathing() {
        if (!strip) return;

        for (let i = 0; i < 255; i += 5) {
            strip.setBrightness(i);
            strip.show();
            basic.pause(15);
        }
        for (let i = 255; i > 0; i -= 5) {
            strip.setBrightness(i);
            strip.show();
            basic.pause(15);
        }
    }

    /**
     * 闪烁随机颜色
     */
    //% block="flash random $times times"
    //% times.defl=5 times.min=1 times.max=20
    export function flashRandom(times: number) {
        if (!strip) return;

        for (let i = 0; i < times; i++) {
            strip.showColor(neopixel.rgb(
                Math.randomRange(0, 255),
                Math.randomRange(0, 255),
                Math.randomRange(0, 255)
            ));
            basic.pause(100);
            strip.clear();
            strip.show();
            basic.pause(100);
        }
    }


    /*******************************************
     * 动态枚举 — MagicMode（用户可新增）
     *******************************************/

    //% shim=ENUM_GET
    //% blockId=magic_mode_enum
    //% block="Magic Mode $arg"
    //% enumName="MagicMode"
    //% enumMemberName="mode"
    //% enumPromptHint="e.g. Sparkle, Pulse..."
    //% enumInitialMembers="Spark, Pulse, Wave"
    export function _magicModeEnumShim(arg: number): number {
        return arg;
    }

    /**
     * 启动魔法模式
     */
    //% block="run magic mode $mode"
    //% mode.shadow="magic_mode_enum"
    export function runMagicMode(mode: number) {
        if (!strip) return;

        if (mode == MagicMode.Spark) {
            flashRandom(5);
        } else if (mode == MagicMode.Pulse) {
            breathing();
        } else if (mode == MagicMode.Wave) {
            rainbow();
        } else {
            // 用户自己新增的模式
            strip.showColor(neopixel.hsl(Math.randomRange(0, 360), 100, 50));
            basic.pause(500);
        }
    }
}
