/*

types:
0 - nothing
1 - diamond

subtypes:
0 - normal
1 - blue
2 - yellow
3 - red

*/

function Tile($tile, properties) {

    if (!properties)
        properties = {};

    this.$tile = $tile;
    var self = this;

    $tile.attr('tile-type', 'board');

    if (properties.isBoardTile) {

        this.x = properties.x;
        this.y = properties.y;

        $tile.attr('board-x', this.x);
        $tile.attr('board-y', this.y);

        if ((this.x + this.y) % 2 == 0) {
            $tile.attr('even', true);
        } else {
            $tile.attr('even', false);
        }

        $tile.click(
            function() {
                self.Clicked();
            });
    };
};

Tile.prototype.Clicked = function() {

    //    if (Timer.running)
    //        return;

    var nextItemTile = PuzzleScene.nextItemTile;

    if (!nextItemTile)
        return;
    else if (nextItemTile.type == 'shifter') {
        ShifterLogic.DoShift(nextItemTile, this);
    } else if (this.type != 'blank')
        return;
    else {
        
        this.setContents(nextItemTile);
        
        var $inner = this.$tile.find('.inner').removeClass('clickit');        
        $inner.width($inner.width());        
        $inner.addClass('clickit');
        
        if(nextItemTile.type == 'teleporter')
            TeleporterLogic.CheckTeleporters();
        
        nextItemTile.setContents(1000);
        PuzzleScene.NextItem();
    }
}

Tile.prototype.setContents = function(contents) {

    if (typeof contents === 'object') {
        this.type = contents.type;
        this.subtype = contents.subtype;
        this.value = contents.value;
    } else {
        this.type = getType(contents[0]);
        this.subtype = getSubtype(this.type, contents[1]);
        this.value = getValue(this.type, this.subtype, contents[2]);
    }
    
    this.DrawContents();

    function getType(t) {

        if (t == ' ')
            return 'blank';
        else if (t == 'D')
            return 'diamond';
        else if (t == 'B')
            return 'block';
    };

    function getSubtype(t, s) {

        if (s == 'N')
            return 'normal';
        else if (s == 'B')
            return 'ice';
        else if (s == 'Y')
            return 'lightning';
        else if (s == 'R')
            return 'fire';
    };

    function getValue(t, s, v){

        if(v == ' ' || v == 'B')
            return 0;
        else
            return parseInt(v);
    };
}

Tile.prototype.DrawContents = function() {

    var $icon = this.$tile.find('.icon').empty().attr('tile-type', this.type);

    if (this.type == 'diamond')
        drawDiamond(this.value);
    else if (this.type == 'block')
        drawBlock(this.value);
    else if (this.type == 'bomb')
        drawBomb();
    else if (this.type == 'shifter')
        drawShifter(this.value);
    else if (this.type == 'mirror')
        drawMirror(this.subtype, this.value);
    else if(this.type =='potion')
        drawPotion(this.subtype);
    else if(this.type == 'teleporter')
        drawTeleporter(this.subtype);

    $icon.attr('tile-subtype', this.subtype);

    function drawDiamond(value) {

        if (value > 0) {

            var $diamond = $('#hidden .diamond-icon').clone();
            $icon.append($diamond);
            $diamond.find('text').html(value);
        }
    };

    function drawBlock(value) {

        var $block = $('#hidden .breakable-block-icon').clone();
        $icon.append($block);
    };

    function drawBomb(value) {

        var $bomb = $('#hidden .bomb-icon').clone();
        $icon.append($bomb);
    };

    function drawShifter(value) {

        var $shifter = $('#hidden .shifter-icon').clone();
        $shifter.find('polygon').attr('transform', 'rotate(' + (90 * value) + ',100,75)');
        $icon.append($shifter);
    };

    function drawMirror(subtype, value) {

        var $mirror = $('#hidden .mirror-icon').clone();
        $mirror.find('polygon').attr('transform', 'rotate(' + (-45 * value) + ',100,100)');
        $icon.append($mirror);
    }
    
    function drawPotion(subtype){
        
        if(subtype == 'potion'){
            
            var $potion = $('#hidden .potion-icon').clone();
            $icon.append($potion);
        }   
        else if(subtype == 'poison'){
            
            var $potion = $('#hidden .poison-icon').clone();
            $icon.append($potion);
        }    
    }
    
    function drawTeleporter(subtype){
        
        var $teleporter = $('#hidden .teleporter-icon').clone().addClass(subtype);
        
//        if(subtype == 't0')
//            $teleporter.find('text').text('\u2660');
//        else if(subtype == 't1')
//            $teleporter.find('text').text('\u2663');
//        else if(subtype == 't2')
//            $teleporter.find('text').text('\u2665');
//        else if(subtype == 't3')
//            $teleporter.find('text').text('\u2666');
                
        $icon.append($teleporter).removeClass('active');
    }
}

Tile.prototype.FlashBackground = function(color) {

    var $bg = this.$tile.find('.bg');
    var bgcolor = $bg.css('fill');
    
    if(this.type == 'block' && this.value == 0){
        return;
    }    

    TweenMax.fromTo($bg, Timer.interval / 800, {
            fill: color 
        }, {
            fill: bgcolor,
        onComplete: function() {
            $bg.css('fill', '');
        }
    });
}

Tile.prototype.Clear = function() {

    this.value = 0;
    this.type = 'blank';
    this.DrawContents();
}

Tile.applyLogic = function(action){

    
};