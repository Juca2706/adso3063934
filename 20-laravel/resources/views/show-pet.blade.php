<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Pet Information 🪪</title>
</head>
<body class="bg-teal-900 p-10 min-h-[100dvh]">
    <h1 class="text-info text-center text-4xl pb-4 border-b-2">Pet Information 🪪</h1>
    <section class="p-10 flex gap-4 flex-wrap justify-center aline-items-center">
<div class="card bg-teal-600 w-96 shadow-sm">
  <figure class="p-4 border-radius-lg">
    <img 
        src="{{ asset('images/'. $pet->image) }}"
        alt="{{ $pet->image }}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      {{ $pet->name }}
      <div class="badge badge-primary">{{ $pet->kind }}</div>
    </h2>
    <details class="collapse bg-base-100 border border-base-300" name="my-accordion-det-1" open>
        <summary class="collapse-title font-semibold"><div class="badge badge-outline badge-secondary">Weight</div></summary>
        <div class="collapse-content bg-teal-500 text-sm text-center font-semibold p-2">{{ $pet->weight }} kg</div>
    </details>
    <details class="collapse bg-base-100  border border-base-300" name="my-accordion-det-1">
        <summary class="collapse-title font-semibold"><div class="badge badge-outline badge-accent">Age</div></summary>
        <div class="collapse-content bg-teal-500 text-sm text-center font-semibold p-2">{{ $pet->age }} years</div>
    </details>
    <details class="collapse bg-base-100  border border-base-300" name="my-accordion-det-1">
        <summary class="collapse-title font-semibold"><div class="badge badge-outline badge-info">Breed</div></summary>
        <div class="collapse-content bg-teal-500 text-sm text-center font-semibold p-2">{{ $pet->breed }}</div>
    </details>

    <details class="collapse bg-base-100  border border-base-300" name="my-accordion-det-1">
        <summary class="collapse-title font-semibold"><div class="badge badge-outline badge-success">Location</div></summary>
        <div class="collapse-content bg-teal-500 text-sm text-center font-semibold p-2">{{ $pet->location }}</div>
    </details>

    <details class="collapse bg-base-100  border border-base-300" name="my-accordion-det-1">
        <summary class="collapse-title font-semibold"><div class="badge badge-outline badge-warning">Active</div></summary>
        <div class="collapse-content bg-teal-500 text-sm text-center p-2">@if($pet->active == '1')
        <div><span class="badge badge-soft badge-success">Active</span></div>
    @else
        <div><span class="badge badge-soft badge-error">Inactive</span></div>
    @endif</div>
    </details>

    <details class="collapse bg-base-100  border border-base-300" name="my-accordion-det-1">
        <summary class="collapse-title font-semibold"><div class="badge badge-neutral badge-outline">Status</div></summary>
        <div class="collapse-content  bg-teal-500 text-sm text-center p-2">@if($pet->active == '1')
        <div><span class="badge badge-soft badge-success">Yes</span></div>
    @else
        <div><span class="badge badge-soft badge-error">No</span></div>
    @endif</div>
    </details>

    <div class="card-actions pb-2 justify-end">
        <a class="text-white bg-teal-700 rounded-full flex items-center gap-2 py-1 px-4 hover:scale-120 transition-all" href="{{ url('view/pets/') }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168A8,8,0,0,1,176,128Z"></path></svg>
        </a>         
    </div>
  </div>
</div>
    </section>
</body>
</html>