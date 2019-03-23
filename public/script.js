function copyURL () {
    document.getElementById('text__clipboard').select();
    document.execCommand("copy");
    document.getElementById('message').textContent = "New URL copied successfully";
}