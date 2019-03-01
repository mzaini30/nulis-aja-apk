$('.navbar-nav a').click(function(){
	$('.navbar-toggle').click()
})

ke_atas = function(){
	$('html, body').animate({
		scrollTop: 0
	}, 700)
}

update_persen = function(){
	data = JSON.parse(localStorage.getItem('jumlah-halaman'))
	jumlah = 0
	for (n in data){
		jumlah += Number(data[n])
	}
	sudah_selesai = jumlah // total jumlah halaman semuanya
	semua = Number(localStorage.getItem('target-halaman')) // target halaman
	if (semua > 0){
		persen_selesai = Math.round(sudah_selesai / semua * 100)	
	} else {
		persen_selesai = 0
	}
	$('.progress-jumlah-halaman').attr('aria-valuenow', persen_selesai).css('width', persen_selesai + '%')
}

grafik = function(){
	data_grafik = JSON.parse(localStorage.getItem('jumlah-halaman')).reverse()
	chart = {
		data: [
			data_grafik[5],
        	data_grafik[4],
        	data_grafik[3],
        	data_grafik[2],
        	data_grafik[1],
        	data_grafik[0]
		],
		background: [
			'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
		],
		color: [
			'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
		]
	}
	simple_chart('.chart', chart)

	if (data_grafik[0] != null){
		maksimal = 0
		for (n in data_grafik){
			if (Number(data_grafik[n]) >= maksimal){
				maksimal = data_grafik[n]
			}
		}
		$('.angka').html(maksimal)
	}
}

if (localStorage.getItem('jumlah-halaman') === null){
	localStorage.setItem('jumlah-halaman', '[]')
}

atur_hasil = function(){
	if (localStorage.getItem('genre') != null){
		$('.hasil').removeClass('sembunyi')
		$('.nama').prop('disabled', true)
	} else {
		$('.hasil').addClass('sembunyi')
		$('.nama').prop('disabled', false)
	}	
}

$('.nama').val(localStorage.getItem('nama'))
$('.judul-buku').val(localStorage.getItem('judul-buku'))
$('.genre').val(localStorage.getItem('genre'))
// $('.genre').find([value=localStorage.getItem('genre')]).attr('selected')
$('.premis').val(localStorage.getItem('premis'))
$('.target-halaman').val(localStorage.getItem('target-halaman'))

bagian_mini_data = function(){
	$('.judul').html(localStorage.getItem('judul-buku'))
	$('.semua').html(localStorage.getItem('target-halaman'))
	data = JSON.parse(localStorage.getItem('jumlah-halaman'))
	halaman_sekarang = 0
	for (n in data){
		halaman_sekarang += Number(data[n])
	}
	$('.sekarang').html(halaman_sekarang)	
}

bagian_mini_data()
grafik()
update_persen()
atur_hasil()

rand = quote[Math.floor(Math.random() * quote.length)]
$('.quote-isi').html(rand[0])
$('.quote-author').html(rand[1])

$('.kirim').click(function(){
	localStorage.setItem('nama', $('.nama').val())
	localStorage.setItem('judul-buku', $('.judul-buku').val())
	localStorage.setItem('genre', $('.genre').val())
	localStorage.setItem('premis', $('.premis').val())
	localStorage.setItem('target-halaman', $('.target-halaman').val())
	data_jumlah_halaman = JSON.parse(localStorage.getItem('jumlah-halaman'))
	data_jumlah_halaman.push($('.jumlah-halaman').val())
	localStorage.setItem('jumlah-halaman', JSON.stringify(data_jumlah_halaman))
	ke_atas()
	bagian_mini_data()
	grafik()
	update_persen()
	atur_hasil()
	// location.reload()
	kirim_nama = $('.nama').val().replace(/ /g, '+')
	kirim_judul_buku = $('.judul-buku').val().replace(/ /g, '+')
	kirim_genre = $('.genre').val().replace(/ /g, '+')
	kirim_premis = $('.premis').val().replace(/ /g, '+')
	kirim_jumlah_halaman = $('.jumlah-halaman').val().replace(/ /g, '+')
	location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSefJjGDYt8FGF8VtmReIMHYPSEAJ-9qD2i_Zbeyy42qjj_MPg/viewform?usp=pp_url&entry.1254118809=' + kirim_nama + '&entry.1071710605=' + kirim_judul_buku + '&entry.1653769640=' + kirim_genre + '&entry.46621118=' + kirim_premis + '&entry.816932494=' + kirim_jumlah_halaman
})

// autocomplete(document.getElementById("myInput"), countries);
// autocomplete(document.getElementById('nama'), nama)
// autocomplete(document.getElementById('genre'), genre)