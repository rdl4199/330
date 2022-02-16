function makechart(data, interval) {
    let timestamp = [];
    for(d of data[`Time Series ${interval}`]){
        timestamp.push(d["open"]);
    }
    const ctx = document.querySelector("#chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'Stock Value',
                data: data,
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