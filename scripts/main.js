// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
  $('#map-image').on('click')
  {
  }

  $('#go-to-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 400)
    return false
  })

  $('.gift-send').click(function () {
    $('#gift-name').text($(this).data('name'))
  })

  $('#reserveGiftButton').click(async function () {
    let name = $('#sender-name').val()
    let message = $('#sender-message').val()
    let present = $('#gift-name').text()
    $('#reserveGiftButton').text('전송중...')
    $('#reserveGiftButton').prop('disabled', true)

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
    const raw = JSON.stringify({
      text: '[' + present + ']' + name + ':' + message,
    })
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
    fetch(
      'https://hooks.slack.com/services/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',
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        if (result == 'ok') {
          $('#giftMailModal').modal('hide')
          alert(name + '님의 메시지가 정상적으로 전송되었습니다.')
          $('#reserveGiftButton').text('예약하기!')
          $('#sender-name').val('')
          $('#sender-message').val('')
          $('#reserveGiftButton').prop('disabled', false)
          $('#' + present).addClass('gift-selected')
          $('#giftMailModal').addClass('modal fade')
          $('#giftMailModal').css('display', 'none')
        }
      })
      .catch(error => {
        console.log('error', error)
        alert('메시지 전송이 실패했습니다. 다시 시도해주세요.')
      })
  })
})

// Smooth scroll for links with hashes
$('a.smooth-scroll').click(function (event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash)
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault()
      $('html, body').animate(
        {
          scrollTop: target.offset().top,
        },
        1000,
        function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target)
          $target.focus()
          if ($target.is(':focus')) {
            // Checking if the target was focused
            return false
          } else {
            $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
            $target.focus() // Set focus again
          }
        }
      )
    }
  }
})
