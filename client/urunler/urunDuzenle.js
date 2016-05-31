import {Template} from 'meteor/templating';
import {Urunler} from '../../collections/Urunler'
import {Session} from 'meteor/session'

import './urunDuzenle.html';

Template.urunDuzenle.helpers({
    islem(){
        return Session.get('islem') || "Ürün Ekle"
    },
    islemYazi(){
        return Session.get('islem') == "Ürün Düzenle" ? "Kaydet" : "Ekle"
    },
    seciliUrun(field){
        let seciliUrun = Session.get('seciliUrun') || {}
        return seciliUrun ? seciliUrun[field] : ""
    }
})


Template.urunDuzenle.events({
    'submit #duzenleForm'(event){
        event.preventDefault();

        const urun = event.target;
        const yeniUrun = {
            urun: urun.urunIsmi.value,
            fiyat: urun.urunFiyat.value,
            stok: urun.urunStok.value
        }

        const islem = Session.get('islem')
        if (islem == 'Ürün Düzenle') {
            const seciliUrun = Session.get('seciliUrun')
            Urunler.update(seciliUrun._id, yeniUrun)
            Session.set('islem', "Ürün Ekle")
        }
        else {
            Urunler.insert(yeniUrun); //
        }

        urun.urunIsmi.value = "";
        urun.urunFiyat.value = "";
        urun.urunStok.value = "";
    }
})