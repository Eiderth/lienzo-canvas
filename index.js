document.addEventListener('DOMContentLoaded', () =>{
    const paintCanvas = document.getElementById('paintCanvas');
    if(paintCanvas && paintCanvas.getContext('2d')){
        const ctx = paintCanvas.getContext('2d');
        paintCanvas.width = paintCanvas.clientWidth;
        paintCanvas.height = paintCanvas.clientHeight;

        const divGuia = document.getElementById('guia');
        divGuia.style.pointerEvents = 'none';
        const grosorSelect = document.getElementById('grosor');
        const colorInput = document.getElementById('color');
        const borradorCheckbox = document.getElementById('borrador');
        const borrarButton = document.getElementById('borrar');

        let mouseActive = false;
        const brush = {
            isErasing : false,
            size : 10,
            color : 'black'
        };

        function startDrawing(e){
            mouseActive = true;
            brush.isErasing = borradorCheckbox.checked;
            brush.size = grosorSelect.value;
            brush.color = colorInput.value;
            draw(e)
        }
        function stopDrawing(){
            mouseActive = false;
        }
        function draw(e){
            if(!mouseActive) return;
            const rect = paintCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if(brush.isErasing){
                ctx.clearRect(x - brush.size / 2, y - brush.size / 2, brush.size, brush.size);
                divGuia.style.borderRadius = '0';
            } else {
                divGuia.style.borderRadius = '100%';
                divGuia.style.border =  `2px solid ${brush.color}`;
                ctx.beginPath();
                ctx.fillStyle = brush.color;
                ctx.arc(x, y, brush.size / 2, 0, 2 * Math.PI);
                ctx.fill()
            }
        }
        function updateGuide(e) {
            divGuia.style.left = `${e.clientX - brush.size / 2}px`;
            divGuia.style.top = `${e.clientY - brush.size / 2}px`;
            divGuia.style.width = `${brush.size}px`;
            divGuia.style.height = `${brush.size}px`;
        }
        paintCanvas.addEventListener('mousedown', startDrawing);
        paintCanvas.addEventListener('mousemove', e => {draw(e); updateGuide(e);});
        paintCanvas.addEventListener('mouseup', stopDrawing);
        paintCanvas.addEventListener('mouseleave', stopDrawing);

        borrarButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
        });
    } else {
        alert('Su navegador no soporta canvas');
    }


});