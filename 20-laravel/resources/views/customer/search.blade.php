@forelse($pets as $pet)
<tr @if($pet->id % 2 == 0) class="bg-[#0006]" @endif>
    <td class="hidden md:table-cell">{{ $pet->id }}</td>
    <td>
        <div class="avatar">
            <div class="w-12 rounded-full">
                <img src="{{ asset('images/'. $pet->image) }}" />
            </div>
        </div>
    </td>
    <td>{{ $pet->name}}</td>
    <td>{{ $pet->kind }}</td>
    <td>{{ $pet->age }} Years</td>
    <td class="hidden md:table-cell">{{ $pet->breed }}</td>
    <td class="hidden md:table-cell">{{ $pet->location }}</td>


    <td class="hidden md:table-cell">
        @if($pet->active == 1)
        <div class="badge badge-outline badge-success">Active</div>
        @else
        <div class="badge badge-outline badge-error">Inactive</div>
        @endif
    </td>
    <td class="hidden md:table-cell">
        @if($pet->status == 0)
        <div class="badge badge-outline badge-warning">No Adopted</div>
        @else
        <div class="badge badge-outline badge-accent">Adopted</div>
        @endif
    </td>

    <td>
        <a href="{{ url('makeadoption/'. $pet->id) }}" class="btn  btn-outline btn-accent btn-xs rounded-full p-3 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                </path>
            </svg>
        </a>
    </td>
</tr>
@empty
<tr class="bg-[#0009]">
    <td colspan="10" class="text-center text-lg font-bold my-4">
        No results found!
    </td>
</tr>
@endforelse