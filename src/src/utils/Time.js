/** Class to Format Time
 * @author shivzee
 */

class Time{
    constructor(time , duration){
        this.time = time;
        this.duration = duration;
    }

    format(seconds){
        seconds=Math.trunc(seconds);
        let h = 0;
        let m = 0;
        let s = seconds%60;
        seconds=Math.trunc(seconds/60);
        m = seconds%60;
        seconds=Math.trunc(seconds/60);
        h = seconds;
        return `${h==0?"":h+":"}${m<10?"0"+m:m}:${s<10?"0"+s:s}`;
    }

    getTime(){
        return `${this.format(this.time)}/${this.format(this.duration)}`
    }

}

export default Time;