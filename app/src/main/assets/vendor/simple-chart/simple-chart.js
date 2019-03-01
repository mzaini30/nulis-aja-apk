simple_chart = function(div, data){
	height = 300
	// $(div).html('tes')
	$(div).css({
		width: '100%',
		height: '300px',
		display: 'block'
	})
	banyak_data = data.data.length // 6
	lebar_elemen = $(div).width() / banyak_data // 48 (px)
	// jumlah_data = 0
	nilai_tertinggi = 0
	for (n in data.data){
		if (data.data[n] == null){
			data.data[n] = 0
		}
		// jumlah_data += Number(data.data[n]) // 10
		if (Number(data.data[n]) >= nilai_tertinggi){
			nilai_tertinggi = data.data[n]
		}
	}
	// $('title').html(nilai_tertinggi)
	$(div).html('')
	for (n in data.data){
		// width = lebar_elemen
		height_elemen = Number(data.data[n]) / nilai_tertinggi * height // harusnya dibagi sama nilai tertinggi
		height_kosong = height - height_elemen
		$(div).append('<div style="float: left; width: ' + lebar_elemen + 'px; height: ' + height + 'px;"><div style="height: ' + height_kosong + 'px;"></div><div style="height: ' + height_elemen + 'px; background: ' + data.background[n] + '; border: 1px solid '+ data.color[n] + ';"></div></div>')
	}
}