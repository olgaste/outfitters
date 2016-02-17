$(document).ready(function() {
    var chosen_product = {
        color: '',
        size: '',
        price: 0,
        quantity: 1
    };

    var timeout = null;

    var chosen_products = [];

    var total_quantity = 0;

    var products = [
    {
        color: '#DB8C57',
        price: '45',
        discount_price: '19',
        color_name: 'Taupe',
        available_sizes: ['xs', 's', 'm', 'l'],
        images: ['images/yellow1.jpg', 'images/yellow2.jpg', 'images/yellow3.jpg']
    },
    {
        color: '#0C5754',
        price: '39',
        discount_price: '19',
        color_name: 'Green',
        available_sizes: ['m'],
        images: ['images/green1.jpg', 'images/green2.jpg', 'images/green3.jpg']
    },
    {
        color: '#000000',
        price: '39',
        color_name: 'Black',
        available_sizes: ['s', 'l'],
        images: ['images/black1.jpg', 'images/black2.jpg', 'images/black3.jpg']
    },
    ];

    var offset = 300,
    offset_opacity = 1200,
    scroll_top_duration = 700,
    $back_to_top = $('.cd-top');

    init();

    function init() {
        loadColors();
        loadImages();
    };

    function loadColors() {
        for (var i = 0; i < products.length; i++) {
            var new_color_div = $("<div></div>").addClass("color_selector").attr("data-id", i);
            var new_child_div = $("<div></div>").css("background-color", products[i].color);
            new_color_div.append(new_child_div);
            $(".color-selector-parent").append(new_color_div);
        }

        $(".color_selector").click(function(){
            // clear all images
            $(".goods").empty();

            // generate new images
            var id = $(this).attr("data-id");
            $(this).addClass("active");

            for(var i=0; i<products[id].images.length; i++) {
                var new_image = $("<img>").attr("src", products[id].images[i]);
                $(".goods").append(new_image);
            }

            // show color name
            $(".color_name").html(products[id].color_name);

            //show price
            $(".product-price").html("&pound;" + products[id].price);

            //show discount price
            if(products[id].discount_price){
                $(".product-price").addClass("striked");
                $(".discount-price").html("&pound;" + products[id].discount_price);
            } else {
                $(".product-price").removeClass("striked");
                $(".discount-price").empty();
            }

            // show available sizes
            var all_sizes = $('.sizes li').removeClass('available');

            for (var i=0; i<all_sizes.length; i++) {
                var size_element = $(all_sizes[i]);

                if (products[id].available_sizes.indexOf(size_element.attr('data-size')) >=0){
                    size_element.addClass('available');
                }
            }

            //save color
            chosen_product.color = products[id].color_name;
            chosen_product.price = products[id].discount_price ? products[id].discount_price : products[id].price;
        });
    };

    function loadImages() {
        $(".color_selector").first().click();
    }

    $('.sizes').on('click', '.available', function() {
        chosen_product.size = $(this).attr('data-size');
    });

    $('.quantity_selector select').on('change', function() {
        chosen_product.quantity = $(this).val();
    });

    $('.add_to_cart').on('click', function() {
        if(timeout) {
            clearTimeout(timeout);
        }

        chosen_products.push(chosen_product);

        var shopping_cart = $('.shopping-cart');
        shopping_cart.find('h3').html($('.product-name').html());
        
            if(chosen_products.length == 1) {

            var chosen_product_img = $('.goods img').first().clone();
            shopping_cart.find('.chosen-product-img').append(chosen_product_img);
            shopping_cart.find('.chosen-product-price').html(chosen_product.price);
            shopping_cart.find('.chosen-product-quantity').html(chosen_product.quantity);
            shopping_cart.find('.chosen-product-color').html(chosen_product.color);
            shopping_cart.find('.chosen-product-size').html(chosen_product.size);
        } else {
            var ul = shopping_cart.find('ul').first().clone();
            ul.find('.chosen-product-price').html(chosen_product.price);
            ul.find('.chosen-product-quantity').html(chosen_product.quantity);
            ul.find('.chosen-product-color').html(chosen_product.color);
            ul.find('.chosen-product-size').html(chosen_product.size);
            shopping_cart.append(ul);
        }
        
        total_quantity = parseInt(chosen_product.quantity) + total_quantity;
        if(total_quantity == 1) {
            $(".shopping-cart-heading h4").html('Added to cart' + ' ' + total_quantity + ' ' + 'item');
        }else{
            $(".shopping-cart-heading h4").html('Added to cart' + ' ' + total_quantity + ' ' + 'items');
        }

        shopping_cart.slideDown(2000);
        timeout = setTimeout(function(){
            shopping_cart.slideUp(2000);
        }, 5000);
    });

    //Close shopping cart
    $('.close-shopping-cart').click(function() {
        $('.shopping-cart').hide();
    });

    //Items removing
    $('.shopping-cart').on('click', '.btn-remove', function(){
        var deleted_quantity = $(this).parent().find('.chosen-product-quantity').html()
        total_quantity = total_quantity - parseInt(deleted_quantity);
        if(total_quantity == 1) {
            $(".shopping-cart-heading h4").html('Added to cart' + ' ' + total_quantity + ' ' + 'item');
        }else{
            $(".shopping-cart-heading h4").html('Added to cart' + ' ' + total_quantity + ' ' + 'items');
        }
        $(this).parent().remove();
    });

    //Details opening
    $('.collapse-down').on('click', function() {
      $('a.collapse-up').show();
      $('a.collapse-down').hide();
    });

    $('.collapse-up').on('click', function() {
      $('a.collapse-up').hide();
      $('a.collapse-down').show();
    });

    // Back to top button
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) { 
            $back_to_top.addClass('cd-fade-out');
        }
    });

    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
        }, scroll_top_duration
        );
    });
});


