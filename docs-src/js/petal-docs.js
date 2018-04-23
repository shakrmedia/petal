
var header = $('#site-header');
var footer = $('#site-footer');
var nav = $('nav#sidenav');

// prevent default button clicks
$('a[href="#"], button').click(function(event) {
    event.preventDefault();
});

// smooth scroll to anchor
$('nav#sidenav a').click(function(e){
    var href = $(this).attr('href');
    var offsetTop = href === '#' ? 0 : $(href).offset().top-30;
    $('html,body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Table section class toggle
$('input[data-toggle-class]').each(function(e) {
    var tableClass = $(this).attr('data-toggle-class');
    if($(this).prop('checked')){
        $('#table-demo table').addClass(tableClass);
    }
});

$('input[data-toggle-class]').click(function(e) {
    var tableClass = $(this).attr('data-toggle-class');
    $('#table-demo table').toggleClass(tableClass);
});

// Form fieldset disable toggle
$('#fieldset-disable-switch').change(function(e) {
    if($(this).prop('checked')){
        $('#fieldsetDisableDemo').prop('disabled', true);
    }
    else {
        $('#fieldsetDisableDemo').prop('disabled', false);
    }
});

// Form spinner toggle button
$('#input-spinner-demo-toggle').click(function(e) {
    e.preventDefault();
    $('[data-toggle-loading-state]').toggleClass('valid').toggleClass('loading');
});

// Spinner button simulation
$('[data-btn-type="save"]').click(function(e) {
    var button = $(this);
    e.preventDefault();
    button.addClass('loading');

    setTimeout(function() {
        button.removeClass('loading');
        button.addClass('loading-done');

        setTimeout(function() {
            button.removeClass('loading-done');
        }, 3000);

    }, 3000);
});

// Spinner toggle button
$('#spinner-demo-toggle').click(function(e) {
    e.preventDefault();
    $('.spinner').toggleClass('spinning');
});

// Demo Modal Toggle
$('#demo-fp-modal-open-btn').click(function(e) {
    $('#demo-fp-modal').addClass('visible');
});

$('[data-modal-close]').click(function(e) {
    $('#demo-fp-modal').removeClass('visible');
});

// Tabs demo
$('.tab-group').each(function() {
    var $tabs = $(this).find('.tab');

    $tabs.each(function() {
        var $this = $(this);

        $this.click(function() {
            if($this.hasClass('disabled')) { return; }

            $tabs.removeClass('selected');
            $this.addClass('selected');
        });
    });
});

$(document).ready(function() {
    // load highlight.js
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('.demo-panel select.selectbox').not('.cover').not('.bottom').selecter();
    $('.demo-panel select.selectbox.cover').selecter({
        cover: true
    });
    $('.demo-panel select.selectbox.bottom').selecter({
        bottom: true
    });

    // stickyfill
    $('.sticky').Stickyfill();
});
