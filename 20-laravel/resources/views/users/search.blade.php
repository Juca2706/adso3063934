@forelse($users as $user)
<tr @if($user->id % 2 == 0) class="bg-[#0006]" @endif>
    <td class="hidden md:table-cell">{{ $user->id }}</td>
    <td>
        <div class="avatar">
            <div class="w-12 rounded-full">
                <img src="{{ asset('images/'. $user->photo) }}" />
            </div>
        </div>
    </td>
    <td class="hidden md:table-cell">{{ $user->document }}</td>
    <td>{{ $user->fullname}}</td>
    <td class="hidden md:table-cell">
        @if($user->role == 'Administrador')
        <div class="badge badge-outline badge-warning">Admin</div>
        @else
        <div class="badge badge-outline badge-accent">Customer</div>
        @endif
    </td>
    <td class="hidden md:table-cell">
        @if($user->active == 1)
        <div class="badge badge-outline badge-success">Active</div>
        @else
        <div class="badge badge-outline badge-error">Inactive</div>
        @endif
    </td>

    <td>
        <a href="{{ url('users/'. $user->id) }}" class="btn  btn-outline btn-accent btn-xs rounded-full p-3 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                </path>
            </svg>
        </a>

        <a href="{{ url('users/'. $user->id. '/edit') }}"
            class="btn btn-outline btn-warning btn-xs rounded-full p-3 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z">
                </path>
            </svg>
        </a>

        <a href="javascript:;" data-fullname="{{ $user->fullname }}"
            class="btn btn-outline btn-error btn-xs btn-delete rounded-full p-3 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                </path>
            </svg>
        </a>
        <form class="hidden" method="POST" action="{{ url('users/'.$user->id) }}">
            @csrf
            @method('delete')
        </form>
    </td>
</tr>
@empty
<tr class="bg-[#0009]">
    <td colspan="7" class="text-center text-lg font-bold my-4">
        No results found!
    </td>
</tr>
@endforelse