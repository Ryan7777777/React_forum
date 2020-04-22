export default function lastUpdateCalaulater(last){
    var now = new Date();
    var lastUpDate = new Date(last)
    var differentSecond = parseInt((now-lastUpDate)/1000)
    var differentMinutes = parseInt(differentSecond/60)
    var differentHour  = parseInt(differentMinutes/60)
    var differentDay = parseInt(differentHour/24)
    if(differentDay > 365){
        return lastUpDate 
    } else if(differentDay >0){
        return differentDay + " days ago"
    } else if(differentHour >0){
        return differentHour + " hour ago"
    } else if (differentMinutes >0){
        return differentMinutes + " minute ago"
    } else{
        return differentSecond + " second ago"
    }
}
