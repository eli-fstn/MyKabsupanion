document.getElementById('downloadBtn').addEventListener('click', function() {
    const image = document.getElementById('classScheduleImage');
    const imageUrl = image.src;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'BSCS-1A_Class_Schedule.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});