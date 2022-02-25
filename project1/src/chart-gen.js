function makechart(data, interval) {
    let timestamp = [];
    let values = [];
    for(let d of Object.keys(data)){
        timestamp.push(d);
    }
    for(let x = 0; x < timestamp.length; x++)
    {
        values[x] = data[timestamp[x]]["1. open"];
    }
    timestamp.reverse();
    values.reverse();
    
    document.querySelector("#chart").remove();
    let canvas = document.createElement('canvas');
    canvas.id = "chart";
    canvas.width = "400";
    canvas.height = "200";
    document.querySelector("#stock-image").appendChild(canvas);
    let chart = document.querySelector('#chart');
    let ctx = chart.getContext('2d');
    
    //let ctx = document.querySelectosr("#chart").getContext('2d');

    //ctx.clearRect(0,0, ctx.width, ctx.height);
    let myChart;
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'Stock Value',
                data: values,
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
export { makechart };