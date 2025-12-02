<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title>
    <style>
        table {
            border: 2px solid #aaa;
            border-collapse: collapse
        }

        table th,
        table td {
            font-family: sans-serif;
            font-size: 10px;
            border: 2px solid #ccc;
            padding: 4px;
        }

        table tr:nth-child(odd) {
            background-color: #eee;
        }

        table th {
            background-color: #666;
            color: #fff;
            text-align: center;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Kind</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Location</th>
                <th>Active</th>
                <th>Status</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pets as $pet)
            <tr>
                <td>{{ $pet->id }}</td>
                <td>{{ $pet->name }}</td>
                <td>{{ $pet->kind}}</td>
                <td>{{ $pet->age }} years</td>
                <td>{{ $pet->breed }}</td>
                <td>{{ $pet->location }}</td>
                <td>
                    @if ($pet->active == 1)
                    Active
                    @else
                    Inactive
                    @endif
                </td>

                <td>
                    @if ($pet->status == 0)
                    No Adopted
                    @else
                    Adopted
                    @endif
                </td>

                <td>
                    @php
                    $extension = substr($pet->image, -4);
                    @endphp
                    @if ($extension != 'webp' && $extension != '.svg')
                    <img src="{{ public_path().'/images/'.$pet->image }}" width="96px">
                    @else
                    Webp|SVG
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>