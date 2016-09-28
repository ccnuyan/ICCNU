function secondsToString(seconds) {
    var numhours = Math.floor(seconds / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    return numhours ? numhours + 'h' + numminutes + 'm': numminutes ? numminutes + 'm': numseconds + 's';

}

export default secondsToString;