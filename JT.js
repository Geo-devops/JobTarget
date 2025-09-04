<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JobTarget</title>
    <style>
        h2 {
            font-size: medium;
            align-items: center;
            color: yellow;
        }
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 12px auto;
        }

        th, td {
            border: 1px solid #f03232;
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background-color:bisque
        }
    </style>
</head>
<body>
    <h1 style="text-align:center;">JobTarget</h1>
    https://publisherfeeds.jobtarget.com/distrib/clients/FlexJobs_CPC/jobtarget.xml


<script>
    fetch('JobTarget.xml')
        .then(response => response.text())
        .then(str => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "application/xml");

            const jobs = xml.getElementsByTagName('job');
            let table = '<table><tr><th>Title</th><th>Company</th><th>URL</th><th>Zipcode</th><th>State</th><th>Description</th><th>Salary</th><th>Jobtype</th></tr>';
              
            for (let i = 0; i < jobs.length; i++) {
                const get = (tag) => jobs[i].getElementsByTagName(tag)[0]?.textContent || '';

                const title = get('title');
                const company = get('company');
                const URL = get('url');
                const zipcode = get('zipcode') || get('postalcode'); // fallback
                const state = get('state');
                const description = get('description');
                const salary = get('salary');
                const jobtype = get('jobtype');

                table += `<tr>
                            <td>${cpc}</td>
                            <td>${date}</td>
                            <td>${title}</td>
                            <td>${companyname}</td>
                            <td><a href="${URL}" target="_blank">${URL}</a></td>
                            <td><a href="${applyurlURL}" target="_blank">${applyurl}</a></td>
                            <td>${postalcode}</td>
                            <td>${state}</td>
                            <td>${description}</td>
                            <td>${salary}</td>
                            <td>${category}</td>
                            <td>${id}</td>
                            <td>${jobtype}</td>
                            </tr>`;
                

            table += '</table>';
            document.getElementById('table-container').innerHTML = table;
        })
        .catch(err => {
            document.getElementById('table-container').innerHTML = `<p>Error loading XML: ${err}</p>`;
        });
</script>