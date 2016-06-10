import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Urunler} from '../collections/Urunler'

Meteor.methods({
    'urunler.ekle'(urun){
        check(urun,{
            urun:String,
            fiyat:Number,
            stok:Number,
            ekleyenId:String,
            kullaniciAdi:String,
            public:Boolean
        })
        // Kullanici icin login kontrolu
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        // kontrollerimiz tamam urunu ekleyebiliriz
        Urunler.insert(urun)

    },
    'urunler.sil'(urunId) {
        check(urunId, String);
        Urunler.remove(urunId);
    },
    'urunler.stokdisi'(urunId){
        Urunler.update(urunId, { $set: { stok: 0 } });
    },
    'urunler.guncelle'(urunId,urun){
        check(urun,{
            urun:String,
            fiyat:Number,
            stok:Number
        })
        // Kullanici icin login kontrolu
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        // kontrollerimiz tamam urunu ekleyebiliriz
        Urunler.update(urunId,urun)

    }
})