import Toast from "@/components/Toast"
import Vue from 'vue'

let tostConstruct = Vue.extend(Toast);
let inited = false;
let $vue;

let initTost = ()=>{
    if(inited)return;
    $vue = new tostConstruct({
        el:document.createElement('div')
    });
    document.body.appendChild($vue.$el);
}
const TostModal = ()=>{
    initTost();

}