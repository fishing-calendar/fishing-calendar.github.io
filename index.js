(async () => {
    const SPRING_DAYS_MIN = [12, 13, 14, 15, 16, 17, 18, 27, 28, 29, 30, 1, 2, 3, 4];
    const NEAP_DAYS = [5, 6, 7, 8, 9, 10, 11, 19, 20, 21, 22, 23, 24, 25, 26];

    const GREGORIAN_MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const HIJRI_MONTHS = [
        'Muḥarram',
        'Ṣafar',
        'Rabīʿ al-Awwal',
        'Rabīʿ al-Thānī',
        'Jumādā al-Awwal',
        'Jumādā al-Thānī',
        'Rajab',
        'Shaʿbān',
        'Ramaḍān ',
        'Shawwāl',
        'Dhū al-Qaʿdah',
        'Dhū al-Ḥijjah'
    ];

    const ELEMENTS = {
        year_selector: document.getElementById('year-selector'),
        calendar_area: document.getElementById('calendar-area'),
        loading_area: document.getElementById('loading-area')
    };

    ELEMENTS.loading_area.removeAttribute('hidden');
    const calendar_res = await fetch('/resources/calendar.json');
    const calendar = await calendar_res.json();
    ELEMENTS.loading_area.setAttribute('hidden', 'true');

    for (const year in calendar) {
        const option = document.createElement('option');
        option.setAttribute('value', year);
        option.innerText = year;
        ELEMENTS.year_selector.appendChild(option);
    }

    ELEMENTS.year_selector.addEventListener('change', (e) => {
        ELEMENTS.calendar_area.innerHTML = '';
        const year = e.target.value;
        for (const month in calendar[year]) {
            const month_element = document.createElement('h3');
            month_element.innerText = GREGORIAN_MONTHS[parseInt(month) - 1];
            ELEMENTS.calendar_area.appendChild(month_element);

            const table = document.createElement('table');
            let row;
            calendar[year][month].forEach((day_date, i) => {
                if (i % 7 == 0 || i % 28 == 0) {
                    row = document.createElement('tr');
                    table.appendChild(row);
                }
                const cell = document.createElement('td');
                gregorian_day = parseInt(day_date.gregorian.split('-')[2]);
                cell.innerText = gregorian_day;
                row.appendChild(cell);
            });
            ELEMENTS.calendar_area.appendChild(table);
        }
    });
})();