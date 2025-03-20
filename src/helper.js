export default {
    isRequired(value) {
        let isMoreThan2 = value?.trim()?.length >= 2;
        let isLessThan255 = value?.trim()?.length <= 255;
        let isOnlySymbols = /^[A-Za-z\n \u10A0-\u10FF]*$/.test(String(value));

        let errorArray = [];

        if(!isMoreThan2){
            errorArray.push('მინიმუმ 2 სიმბოლო');
        }
        if(!isLessThan255){
            errorArray.push('მაქსიმუმ 255 სიმბოლო');
        }
        if(!isOnlySymbols){
            errorArray.push('მარტო ლათინური და ქართული სიმბოლოები');
        }
        if(errorArray.length > 0){
            return errorArray;
        }else{
            return true;
        }
    },
    isPhotoUploadedValid(file){
        if(file?.type){
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
            let isFileImage = false;
            let isUnder600KB = false;
            isFileImage = validImageTypes.includes(decodeURIComponent(file.type));
            isUnder600KB = file.size <= 600 * 1024;
            let errorArray = [];
            if(!isFileImage){
                errorArray.push('ფაილი უნდა იყოს სურათის ტიპის');
            }
            if(!isUnder600KB){
                errorArray.push('მაქსიმუმ 600kb ზომაში');
            }
            if(errorArray.length > 0){
                return errorArray;
            }else{
                return true;
            }
        }
        return ['ფაილი უნდა იყოს სურათის ტიპის'];
    },
    checkInputNumberIDValRequired(value){
        let errorArray = [];
        if(!/^[\d]+$/.test(value)){
            errorArray.push('სავალდებულო');
        }
        if(errorArray.length > 0){
            return errorArray;
        }else{
            return true;
        }
    },
    checkNumber(item){
        return /^[\d]+$/.test(String(item));
    },
    MonthArr: [
        'იან','თებ','მარტ','აპრ','მაი','ივნ','ივლ','აგვ','სექ','ოქტ','ნოე','დეკ',
    ],
    weekDayArr: [
        'კვი','ორშ','სამ','ოთხ','ხუთ','პარ','შაბ',
    ],
}