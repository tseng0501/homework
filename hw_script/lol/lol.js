let row = document.querySelector('.row');
let modal_body = document.getElementById('modal-body');
let modal_head = document.getElementById('exampleModalLabel')
$.ajax({
    dataType: "json",
    url: "https://raw.githubusercontent.com/an56665666/HTMLHomework1/master/LOLJASON.json",
    type: "Get",
    success: function (response) {

        for (let i = 0; i <= response.length; i++) {
            
            let img = document.createElement('img');
            img.src = response[i].icon;
            let text = document.createElement('h5');
            text.textContent = response[i].name;

            let col = document.createElement('col');
            col.className = 'col text-center hover-color';
            col.appendChild(img);
            col.appendChild(text);
            row.appendChild(col);

            col.addEventListener('click', () => {
                $('#exampleModal').modal('toggle');
                
                modal_body.textContent = "";
                modal_head.textContent = response[i].name;

                for (let item in response[i].stats) {
                    var p = document.createElement('p');
                    p.innerHTML = (`${item}:${response[i].stats[item]}`);
                    modal_body.appendChild(p);
                }

            })
        }
    }

})