<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Adoptions</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>User Document</th>
                <th>User Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Pet Name</th>
                <th>Kind</th>
                <th>Age</th>
                <th>Breed</th>
                <th>Location</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($adoptions as $adopt)
            <tr>
                <td>{{ $adopt->user->document }}</td>
                <td>{{ $adopt->user->fullname }}</td>
                <td>{{ $adopt->user->phone}}</td>
                <td>{{ $adopt->user->email }}</td>

                <td>
                    @php
                    $extension = substr($adopt->user->photo, -4);
                    @endphp
                    @if ($extension != 'webp' && $extension != '.svg')
                    <img src="{{ public_path().'/images/'.$adopt->user->photo }}" width="96px">
                    @else
                    Webp|SVG
                    @endif
                </td>

                <td>{{ $adopt->pet->name }}</td>
                <td>{{ $adopt->pet->kind }}</td>
                <td>{{ $adopt->pet->age }} years</td>
                <td>{{ $adopt->pet->breed }}</td>
                <td>{{ $adopt->pet->location }}</td>

                <td>
                    @php
                    $extension = substr($adopt->pet->image, -4);
                    @endphp
                    @if ($extension != 'webp' && $extension != '.svg')
                    <img src="{{ public_path().'/images/'.$adopt->pet->image }}" width="96px">
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