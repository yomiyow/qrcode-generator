import Button from "./Button";

function Form({ onGenerateQr, onChange }) {
  return (
    <form className="flex flex-col py-4 px-4 gap-y-3 w-4/12 min-w-fit"
      onSubmit={(e) => onGenerateQr(e)}
    >
      <div className="flex flex-row items-center">
        <input
          className={`
            border-2 border-slate-400 rounded
            outline-hidden 
            px-2 py-1 mr-2
            text-sm 
          `}
          type="text" name="data" id="qrcodeText" required
          onChange={(e) => onChange(e)}
        />
        <Button type="submit">Generate</Button>
      </div>
      <div className="flex flex-col gap-x-4">
        <div className="flex gap-x-1 flex-1">
          <label htmlFor="bgColor">Background Color: </label>
          <input className="bg-transparent cursor-pointer"
            type="color" name="bgColor" id="bgColor"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex gap-x-1 flex-1">
          <label htmlFor="dimension">Dimension: </label>
          <div className="w-full">
            <input className="w-full"
              type="range" name="dimension" id="dimension"
              min="200" max="700" defaultValue="400" step="100"
              list="values" onChange={(e) => onChange(e)}
            />
            <datalist className="flex flex-col justify-between text-sm w-full"
              style={{ writingMode: "vertical-lr" }}
              id="values"
            >
              <option value="200" label="200"></option>
              <option value="300" label="300"></option>
              <option value="400" label="400"></option>
              <option value="500" label="500"></option>
              <option value="600" label="600"></option>
              <option value="700" label="700"></option>
            </datalist>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
