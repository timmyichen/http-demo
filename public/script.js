/* global $ */

function getData() {
    $.get('/api/last-request', data => {
        const html = data ? `
            <pre>
${JSON.stringify(data, null, 2)}
            </pre>
        ` : '';
        $('#req-contents').html(html);
        $.get('/api/guestbook', (data) => {
            const html = data.map(entry => {
                return `
                    <tr>
                        <td>${entry.id}</td>
                        <td>${entry.name}</td>
                        <td>${entry.message}</td>
                        <td><button class="ui button negative" onClick="deleteEntry(${entry.id});">Delete</button></td>
                    </tr>
                `;
            }).join('');
            $('#guestbook-body').html(html);
        });
    });
}

function resetFields() {
    $('#name').val('');
    $('#message').val('');
}

function deleteEntry(id) {
    $.ajax({
        url: `/api/guestbook/${id}`,
        type: 'DELETE',
        success: (res) => {
            getData();
        }
    })
}

function deleteAll() {
    $.ajax({
        url: `/api/guestbook/all`,
        type: 'DELETE',
        success: (res) => {
            getData();
        }
    })
}

$(document).ready(() => {
    getData();
    
    $('#add-name').click(() => {
        const name = $('#name').val();
        const message = $('#message').val();
        $.post('/api/guestbook/new', { name, message }, (res) => {
            resetFields();
            getData();
        });
    });
})