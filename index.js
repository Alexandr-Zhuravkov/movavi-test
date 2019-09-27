$(function(){
	//--СПИСОК ТОВАРА
	var goods = {
		'0001': {
			'name': 'Пакет видеопрограмм',
			'descript': 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и <br> ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
			'price': 1990,
			'url': './images/img1.png' 
		},
		'0002': {
			'name': 'Фотостудия Movavi',
			'descript': 'Полный набор инструментов для легкой фотообработки. Настраивайте параметры изображения вручную и улучшайте качество автоматически, добавляйте крутые фильтры и надписи. Обрезайте, отражайте и поворачивайте кадр, изменяйте размер фото. Удаляйте с фото лишние объекты и заменяйте скучные фоны. Обрабатывайте папки с фото в пакетном режиме, создавайте слайд-шоу с музыкой и переходами.',
			'price': 1890,
			 'url': './images/img2.png'
		},
		'0003': {
			'name': 'Movavi Фоторедактор',
			'descript': 'Улучшайте качество фото автоматически и вручную. Настраивайте резкость, контраст и цветность. Удаляйте с фотографий объекты, случайно попавшие в кадр. Заменяйте фон изображения. Добавляйте надписи. Выделяйте элементы при помощи удобных инструментов – кисти, волшебной палочки или лассо. Используйте штамп, чтобы устранять мелкие дефекты изображений.',
			'price': 990,
			'url': './images/img3.png' 
		},
		'0004': {
			'name': 'Movavi Пакетный фоторедактор',
			'descript': 'Обрабатывайте любое количество фотографий одним нажатием кнопки – уменьшайте целые фотоальбомы, переименовывайте файлы, конвертируйте формат и улучшайте качество изображений в пакетном режиме. Теперь вам не придется сохранять каждый файл по отдельности: просто примените изменения ко всем фото сразу и экспортируйте их с новыми настройками!',
			'price': 490,
			'url': './images/img4.png' 
		},
		'0005': {
			'name': 'Захват видео с экрана',
			'descript': 'Записывайте все, что происходит на экране вашего монитора: видеочаты, работу в программах и интернет-браузерах и многое другое. Сохраняйте скринкасты в любые популярные форматы и для мобильных устройств.',
			'price': 1490,
			'url': './images/img5.png' 
		}
	};

	var goodsList = $('.goods-list'),
		shoppingList = $('.shopping-list'),
		mask = 'mask_', // маска для ключа в localStorage
		widthWrapper = $('.wrapper').outerWidth(),
		widthBasket = $('.basket').outerWidth(),
		marginBasket = parseInt($('.basket').css('margin-right'));


	// --записывает в массив артикулы товара в корзине и подсчитывает их общую стоимость.
	function calcPrice () {
		var totalCost = 0;
		var totalArr = [];

		$(shoppingList).children().each(function(index, el){
			var idEl = $(el).attr('data-id');
			totalArr.push(idEl);

			var priceEl = goods[idEl].price;
			totalCost = totalCost + priceEl;
		});

		$('.total-cost').text(totalCost);
		totalArr.push(totalCost);

		return totalArr;
	};

	// ф-ция добавляет на стр-цу элементы списка товаров из обьекта goods
	function addList (){
		for (var id in goods) {
			var newGoodsItem = $('<li></li>').addClass('goods-item').attr('data-id', id).appendTo(goodsList);

			var newImgGoodsItem = $('<img>').attr('src', goods[id].url).attr('alt', "Фото товара").appendTo(newGoodsItem);

			var newProductWrap = $('<div></div>').addClass('product-wrap').attr('data-id', id).appendTo(newGoodsItem);

			var newProductTitle = $('<h3></h3>').addClass('product-title').attr('data-id', id).html(goods[id].name).appendTo(newProductWrap);

			var newDescription = $('<p></p>').addClass('product-description').attr('data-id', id).html(goods[id].descript).appendTo(newProductWrap);

			var newPriceWrap = $('<div></div>').addClass('price-wrap').attr('data-id', id).appendTo(newGoodsItem);

			var newPrice = $('<p></p>').addClass('price').attr('data-id', id).html(goods[id].price + ' руб.').appendTo(newPriceWrap);

			var newGoodsBtn = $('<button></button>').addClass('goods-btn').attr('data-id', id).html('В корзину!').appendTo(newPriceWrap);
		}
	};
	addList();

	//добавляем в корзину товар при клике и записываем ее артикул(id) в localStorage
	$('.goods-list .goods-btn').on('click', function(ev) {
		
		var listId = $(ev.target).attr('data-id');
		var itemStorage = 0;

		shoppingList.children().each(function(index, el){
			var elStorage = $(el).attr('data-storage');
			if (elStorage > itemStorage) {
				itemStorage = elStorage;
			}
		});

		itemStorage++;
		localStorage.setItem(mask+itemStorage, listId);

		var newShopItem = $('<li></li>').addClass('shopping-item').attr('data-id', listId).attr('data-storage', itemStorage).appendTo(shoppingList);

		var newImgDeleteItem = $('<img>').addClass('shopping-item-delete').attr('src', './images/cross.png').attr('data-id', listId).attr('data-storage', itemStorage).attr('alt', "Удалить товар").appendTo(newShopItem);
		
		var newShopItemTitle = $('<p></p>').addClass('shopping-item-title').attr('data-id', listId).attr('data-storage', itemStorage).html(goods[listId].name).appendTo(newShopItem);
		
		var newShopItemPrice = $('<p></p>').addClass('shopping-item-price').attr('data-id', listId).attr('data-storage', itemStorage).html(goods[listId].price + ' руб.').appendTo(newShopItem);

		calcPrice ();
	});

	// при каждой загрузке страницы проверяет в localStorage наличие ключей товара(добавляет их в корзину)
	function showBasket () {
		var lsLen = localStorage.length;
		if(lsLen > 0) {
			for (var i = 0; i < lsLen; i++){

				var key = localStorage.key(i);

				if (key.indexOf('mask_') == 0) {

					var listId = localStorage.getItem(key);
					var itemStorage = key.slice(5);

					var newShopItem = $('<li></li>').addClass('shopping-item').attr('data-id', listId).attr('data-storage', itemStorage).appendTo(shoppingList);

					var newImgDeleteItem = $('<img>').addClass('shopping-item-delete').attr('src', './images/cross.png').attr('data-id', listId).attr('data-storage', itemStorage).attr('alt', "Удалить товар").appendTo(newShopItem);
		
					var newShopItemTitle = $('<p></p>').addClass('shopping-item-title').attr('data-id', listId).attr('data-storage', itemStorage).html(goods[listId].name).appendTo(newShopItem);
		
					var newShopItemPrice = $('<p></p>').addClass('shopping-item-price').attr('data-id', listId).attr('data-storage', itemStorage).html(goods[listId].price + ' руб.').appendTo(newShopItem);	
				}
			}
		};
		calcPrice ();
	};

	showBasket ();

	//удаляет из корзины товар при клике на крестик
	$('.basket').on('click','.shopping-item-delete', function(ev){
		var elTarget = $(ev.target);
		var elStorage = elTarget.attr('data-storage');

		localStorage.removeItem(mask+elStorage);
		elTarget.closest('.shopping-item').remove();		
		
		calcPrice ();
	});

	// функция оформить заказ
	$('.order').on('click', function(){
		var totalArr = calcPrice();
		var totalCost = totalArr.pop();
		var totalList = totalArr.map(function(el) {
			return goods[el].name
		}).join('\n  -');

		if( totalList.length ) {
			alert("Вы добавили в корзину:\n" + '  -' + totalList + '\nНа сумму:  ' + totalCost + ' руб.');
		} else {
			alert("Ваша корзина пуста!!");
		}	
	});

	// ф-ция display: sticky; для корзины
	$(window).on('scroll', function(){
		var basketTop = $('.basket-position')[0].getBoundingClientRect().top;
		var positionLeft = $('.basket').offset().left + 'px';

		if ( basketTop <= 0 ) {
			$('.basket').addClass('sticky').css({'left': positionLeft});
		} else {
			$('.basket').removeClass('sticky').removeAttr('style');
		}	
	});

	$(window).on('resize', function() {
		var indexSticky = $('.basket').attr('class').split(' ').indexOf('sticky');

		if (indexSticky >= 0) {
			var positionLeftBasket = $('.wrapper').offset().left + (widthWrapper - widthBasket - marginBasket);
			$('.basket').css({'left': positionLeftBasket});
		}	
	});
})
