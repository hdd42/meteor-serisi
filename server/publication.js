import {Urunler} from '../collections/Urunler'

Meteor.publish('urunlerPub', function urunlerPublication() {
    const filitre = {

        $or: [
            {public: {$ne: false}},
            {ekleyenId: this.userId},
        ]
    }
    return Urunler.find(filitre);
});