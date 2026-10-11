export type Entry={id:string;kind:string;day:string;data:Record<string,any>;photo?:boolean;createdAt:number};
export type Point={x:number;y:number;visibility?:number};
export const localDay=(date=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tehran',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
export function adaptation(entries:Entry[],ready:{pain:boolean;sleep:number;fatigue:number}){
 if(ready.pain)return {factor:0,rest:60,reason:'با درد، تیرکشیدن، گزگز یا بی‌حسی، جلسه شروع نمی‌شود؛ وضعیتت را بررسی کن.'};
 const sessions=entries.filter(e=>e.kind==='session').sort((a,b)=>b.createdAt-a.createdAt);let factor=Number(sessions[0]?.data.factor)||.7;const latest=sessions[0];
 if(latest && (latest.data.pain || entries.some(e=>e.kind==='followup'&&e.data.sessionId===latest.id&&e.data.clear===false)))return {factor:0,rest:60,reason:'جلسهٔ قبلی یا پیگیری آن با علامت ثبت شده؛ پلانک تا بررسی و رفع محدودیت تأییدشده متوقف است.'};
 if(ready.fatigue>=7||ready.sleep<5)return {factor:Math.max(.35,factor*.8),rest:60,reason:'به‌خاطر خستگی یا خواب کم، زمان امروز ۲۰٪ کوتاه‌تر است.'};
 const good=sessions.slice(0,2),confirmed=good.every(s=>entries.some(e=>e.kind==='followup'&&e.data.sessionId===s.id&&e.data.clear===true&&e.day>s.day));
 if(good.length===2&&new Set(good.map(s=>s.day)).size===2&&good.every(s=>s.data.complete&&s.data.rpe<=6&&!s.data.pain)&&confirmed&&latest.day<localDay())return {factor:Math.min(1,factor+.05),rest:45,reason:'دو جلسه در دو روز با پیگیری بی‌علامت؛ زمان پیشنهادی ۵ واحد درصد بیشتر شده است.'};
 if(latest?.data.rpe>=8)factor=Math.max(.35,factor*.85);
 return {factor,rest:45,reason:'شروع با ۷۰٪ زمان اپ؛ افزایش فقط پس از نتیجهٔ جلسه و پیگیری روز بعد.'};
}
export function assessPlank(points:Point[],width:number,height:number,type:string){
 if(!['straight','forearm'].includes(type))return {status:'unknown',message:'این حرکت ارزیابی خودکار ندارد؛ راهنمای تصویری را دنبال کن.'};
 const score=(ids:number[])=>ids.reduce((a,i)=>a+(points[i]?.visibility||0),0);const l=[11,13,15,23,27],r=[12,14,16,24,28],ids=score(l)>score(r)?l:r;
 if(ids.some(i=>!points[i]||(points[i].visibility||0)<.65))return {status:'unknown',message:'شانه، لگن و مچ پا کامل و واضح دیده نمی‌شوند.'};
 const [s,e,w,h,a]=ids.map(i=>({x:points[i].x*width,y:points[i].y*height}));const len=Math.hypot(a.x-s.x,a.y-s.y);
 if(len<width*.25||Math.abs(a.x-s.x)<Math.abs(a.y-s.y)*1.5)return {status:'unknown',message:'گوشی از پهلو و تمام بدن در کادر باشد.'};
 const offset=(h.y-(s.y+(a.y-s.y)*(h.x-s.x)/(a.x-s.x)))/len;
 if(offset>.075)return {status:'warning',message:'لگن نسبت به خط تنه پایین دیده می‌شود؛ مکث کن و فرم را تنظیم کن.'};
 if(offset<-.09)return {status:'warning',message:'لگن نسبت به خط تنه بالا دیده می‌شود؛ فرم را تنظیم کن.'};
 const base=type==='forearm'?e:w;if(Math.abs(base.x-s.x)/len>.12)return {status:'warning',message:type==='forearm'?'آرنج را تقریباً زیر شانه بگذار.':'مچ را تقریباً زیر شانه بگذار.'};
 return {status:'aligned',message:'راستای تنه در تصویر قابل‌قبول است؛ این تأیید ایمنی کمر یا گردن نیست.'};
}
export const basePlan=[
 {title:'گرم‌کردن آرام',seconds:180,type:'warm',cue:'راه‌رفتن درجا و حرکت آرام شانه و مچ؛ گردن را به انتهای دامنه فشار نده.'},
 {title:'پلانک دست‌صاف',seconds:100,type:'straight',cue:'شانه بالای مچ؛ سر، تنه و لگن هم‌راستا؛ تنفس عادی.'},
 {title:'پلانک با پای چپ بالا',seconds:50,type:'leg',cue:'پا کمی بالا؛ لگن نچرخد؛ اگر کنترل سخت شد هر دو پا زمین.'},
 {title:'پلانک با پای راست بالا',seconds:50,type:'leg',cue:'پا کمی بالا؛ لگن نچرخد؛ اگر کنترل سخت شد هر دو پا زمین.'},
 {title:'پلانک دست و پای مخالف · اول',seconds:40,type:'diagonal',cue:'یک دست با پای مخالف؛ لگن ثابت؛ در صورت افت کنترل به پلانک معمولی برگرد.'},
 {title:'پلانک دست و پای مخالف · دوم',seconds:40,type:'diagonal',cue:'جای دست و پای بالارفته را عوض کن؛ گردن و کمر در راستای تنه.'},
 {title:'پلانک دست‌صاف',seconds:100,type:'straight',cue:'با افت فرم زمان را زودتر تمام کن.'},
 {title:'پلانک ساعد',seconds:100,type:'forearm',cue:'آرنج زیر شانه؛ ساعد زمین؛ کمر افتاده یا لگن بالا نباشد.'},
 {title:'سردکردن آرام',seconds:120,type:'cool',cue:'قدم‌زدن آرام و تنفس عادی؛ کشش اجباری کمر و گردن نداریم.'},
];
export function buildPlan(factor:number,rest:number){const steps:any[]=[];basePlan.forEach((s,i)=>{steps.push({...s,seconds:['warm','cool'].includes(s.type)?s.seconds:Math.round(s.seconds*factor)});if(i>0&&i<7)steps.push({title:'استراحت',seconds:rest,type:'rest',cue:'از وضعیت پلانک خارج شو و برای حرکت بعد آماده شو.'})});return steps;}
