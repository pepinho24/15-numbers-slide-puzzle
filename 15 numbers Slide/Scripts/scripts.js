/// <reference path="jquery-2.1.1.intellisense.js" />

window.onload = function () {
    var score = 0;

    var $inputBackground = $('#input-background');
    
    $inputBackground.on('change', function () {
        
        var url = 'url(' + this.value + ')';
        $('#wrapper').css('background-image', url)
    })

    var $inputBlock = $('#input-block');
    $inputBlock.on('change', function () {
        
        var url = 'url(' + this.value + ')';
        $('#container div.clickable').css('background-image', url)
    })

    $('#btn-start-new-game').on('click', function () {
        shuffleNumbers();
        score = 0;
        $scoreContainer.html('<p>Score : ' + score + '</p>');
    })


    var $empty = $("#empty");
    var $container = $("#container");
    var $scoreContainer = $("#score-container");
    $scoreContainer.html('<p>Score : ' + score + '</p>');

    $container.children('div').addClass('clickable');
    $empty.removeClass('clickable');
    

    function updateScore(scorePoints) {
        score += scorePoints;
        $scoreContainer.html('<p>Score : ' + score + '</p>');
    }

    $container.on('click', 'div.clickable', function () {
        var $this = $(this);
        var $prev = $this.prev();
        var $next = $this.next();

        if ($this.prev().prev().prev().prev().attr('id') === "empty") { // up
            $this.insertBefore($empty);
            $empty.insertAfter($prev);
            updateScore(1);

        } else if ($this.next().next().next().next().attr('id') === "empty") { // down
            $this.insertAfter($empty);
            $empty.insertBefore($next);
            updateScore(1);

        } else if ($this.prev().attr('id') === "empty") { // left
            var index = $this.index() + 1;
            //console.log(index)
            if (index % 4 !== 1) {
                $this.insertBefore($empty);
                updateScore(1);
            } 

        } else if ($this.next().attr('id') === "empty") { // right
            index = $this.index() + 1;
            //console.log(index)
            if (index % 4 !== 0) {
                $empty.insertBefore($this);
                updateScore(1);
            }
        }

        // check if numbers are ordered
        if (checkIfNumbersAreOrdered()) { // if true => game over, you win
            alert('You win');
        }
    });

    function checkIfNumbersAreOrdered() {
        if ($container.children().last().attr('id') === "empty") {
            if ($empty.prev().attr('id') === '15') {
                $current = $empty.prev();
                if ($current.prev().attr('id') === '14') {
                    $current = $current.prev();
                    if ($current.prev().attr('id') === '13') {
                        $current = $current.prev();
                        if ($current.prev().attr('id') === '12') {
                            $current = $current.prev();
                            if ($current.prev().attr('id') === '11') {
                                $current = $current.prev();
                                if ($current.prev().attr('id') === '10') {
                                    $current = $current.prev();
                                    if ($current.prev().attr('id') === '9') {
                                        $current = $current.prev();
                                        if ($current.prev().attr('id') === '8') {
                                            $current = $current.prev();
                                            if ($current.prev().attr('id') === '7') {
                                                $current = $current.prev();
                                                if ($current.prev().attr('id') === '6') {
                                                    $current = $current.prev();
                                                    if ($current.prev().attr('id') === '5') {
                                                        $current = $current.prev();
                                                        if ($current.prev().attr('id') === '4') {
                                                            $current = $current.prev();
                                                            if ($current.prev().attr('id') === '3') {
                                                                $current = $current.prev();
                                                                if ($current.prev().attr('id') === '2') {
                                                                    $current = $current.prev();
                                                                    if ($current.prev().attr('id') === '1') {
                                                                        return true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return false;
        }
    }

    function shuffleNumbers() {
        var divs = $.makeArray($container.find('div'));

        // The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle. http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffle(array) {
            var currentIndex = array.length
              , temporaryValue
              , randomIndex
            ;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        var newDivs = shuffle(divs);
        $container.empty();

        for (var j = 0; j < newDivs.length; j += 1) $(newDivs[j]).appendTo($container);
    }
}