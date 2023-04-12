document.querySelector("#authorisePcloudBtn").addEventListener('click', function (e) {
    window.open('/pcloud/authURL','popup','width=600,height=600')
});

document.querySelector("#authoriseGdriveBtn").addEventListener('click', function (e) {
    window.open('/gdrive/authURL','popup','width=600,height=600')
});