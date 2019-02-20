update_persen = function(){
	sudah_selesai = $('.cek-oke').length
	semua = $('.cek').length
	if (semua > 0){
		persen_selesai = Math.round(sudah_selesai / semua * 100)	
	} else {
		persen_selesai = 0
	}
	$('.progress-bar').attr('aria-valuenow', persen_selesai).css('width', persen_selesai + '%')
	$('.alert-success').html(persen_selesai + '% Complete')
}
$('.navbar-nav li a').click(function(){
	$('.navbar-toggle').click()
})

if (localStorage.getItem('reading challenge') == null){
	$('body').addClass('atur-tinggi')
	$('#myModal').modal()
	$('.progress').hide()
} else {
	$('body').removeClass('atur-tinggi')
	$('.isi-target').html(localStorage.getItem('reading challenge'))
	update_persen()
}
$('.buka-modal').click(function(){
	$('body').addClass('atur-tinggi')
	$('#myModal').modal()
})

$('.count').click(function(){
	$('body').removeClass('atur-tinggi')
	hasil_bagi = Math.ceil($('.total-pages').val() / $('.target-finish').val())
	// $('title').html(hasil_bagi)
	list_halaman = []
	for (x = hasil_bagi; x <= $('.total-pages').val(); x += hasil_bagi){
		list_halaman.push(x)
	}
	if (list_halaman[list_halaman.length - 1] != $('.total-pages').val()){
		list_halaman.push($('.total-pages').val())
	}
	$('.isi-target').html('')
	for (x in list_halaman){
		$('.isi-target').append('<tr><td class="cek-container"><div class="btn btn-default cek">&check;</div></td><td class="isi">Page '+list_halaman[x]+'</td></tr>')
	}
	$('.progress').show()
	update_persen()
	localStorage.setItem('reading challenge', $('.isi-target').html())
})

$(document).on('click', '.cek', function(){
	$(this).toggleClass('btn-default').toggleClass('btn-success').toggleClass('cek-oke')
	$(this).parent().parent().find('.isi').toggleClass('selesai')
	update_persen()
	localStorage.setItem('reading challenge', $('.isi-target').html())
})