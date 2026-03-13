var board = null;
var game = new Chess();
var $status = $('#status');

// --- THỦ THUẬT LÁCH LUẬT BẢO MẬT TRÌNH DUYỆT ĐỂ TẢI AI ---
var blob = new Blob([
    "importScripts('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.0/stockfish.js');"
], { type: 'application/javascript' });
var stockfish = new Worker(URL.createObjectURL(blob));
// --------------------------------------------------------

// Hàm in lịch sử nước đi ra bảng
function renderMoveHistory() {
    var history = game.history();
    var $historyList = $('#move-history');
    $historyList.empty(); 
    
    for (var i = 0; i < history.length; i += 2) {
        var moveNumber = (i / 2) + 1;
        var whiteMove = history[i];
        var blackMove = history[i + 1] ? history[i + 1] : '';
        
        var li = `<li>
            <span class="move-num">${moveNumber}.</span>
            <span class="white-move">${whiteMove}</span>
            <span class="black-move">${blackMove}</span>
        </li>`;
        $historyList.append(li);
    }
    
    var historyPanel = document.getElementById('move-history');
    if(historyPanel) {
        historyPanel.scrollTop = historyPanel.scrollHeight;
    }
}

stockfish.onmessage = function (event) {
    var line = event.data;
    if (line && line.indexOf('bestmove') > -1) {
        var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
            game.move({ from: match[1], to: match[2], promotion: match[3] || 'q' });
            board.position(game.fen());
            updateStatus();
            renderMoveHistory(); 
        }
    }
};

function makeBestMove() {
    var depth = $('#difficulty').val(); 
    stockfish.postMessage('position fen ' + game.fen());
    stockfish.postMessage('go depth ' + depth);
}

function onDragStart (source, piece) {
    if (game.game_over() || piece.search(/^b/) !== -1) return false; 
}

function onDrop (source, target) {
    var move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';

    updateStatus();
    renderMoveHistory(); 
    
    window.setTimeout(makeBestMove, 250);
}

function onSnapEnd () { 
    board.position(game.fen()); 
}

function updateStatus () {
    var statusHTML = '';
    var moveColor = game.turn() === 'b' ? 'Đen (Máy)' : 'Trắng (Bạn)';

    if (game.in_checkmate()) statusHTML = 'Trò chơi kết thúc, ' + moveColor + ' bị chiếu bí!';
    else if (game.in_draw()) statusHTML = 'Trò chơi kết thúc, Hòa cờ!';
    else {
        statusHTML = 'Lượt: ' + moveColor;
        if (game.in_check()) statusHTML += ' - Đang bị chiếu!';
    }
    $status.text(statusHTML);
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

$(document).ready(function() {
    board = Chessboard('board', config);
    updateStatus();
    renderMoveHistory();

    $('#reset-btn').on('click', function() {
        game.reset();
        board.start();
        updateStatus();
        renderMoveHistory();
    });

    $('#undo-btn').on('click', function() {
        game.undo(); 
        game.undo(); 
        board.position(game.fen()); 
        updateStatus();
        renderMoveHistory();
    });

    $('#toggle-3d').on('click', function() {
        $('#board').toggleClass('mode-3d');
    });

    $('#theme').on('change', function() {
        $('body').removeClass('theme-wood theme-blue').addClass($(this).val());
    });
});
/* Dàn hàng ngang cho bàn cờ và bảng lịch sử */
.game-container {
    display: flex;
    gap: 30px;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 800px;
}

/* Giao diện bảng lịch sử */
.history-panel {
    background: #34495e;
    padding: 15px;
    border-radius: 8px;
    width: 250px;
    height: 450px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
}

.history-panel h3 {
    margin-top: 0;
    text-align: center;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 10px;
}

#move-history {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto; /* Cho phép cuộn khi lịch sử dài */
    flex-grow: 1;
}

#move-history li {
    padding: 8px;
    border-bottom: 1px solid #2c3e50;
    font-family: monospace;
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
}

#move-history li span.move-num { color: #95a5a6; width: 30px;}
#move-history li span.white-move { color: #ecf0f1; width: 60px;}
#move-history li span.black-move { color: #e74c3c; width: 60px; text-align: right;}
