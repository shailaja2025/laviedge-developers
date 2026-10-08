export default function HudFrame({ className = '' }) {
  return (
    <div className={`hud-frame ${className}`} aria-hidden="true">
      <span className="hud-frame__c hud-frame__c--tl" />
      <span className="hud-frame__c hud-frame__c--tr" />
      <span className="hud-frame__c hud-frame__c--bl" />
      <span className="hud-frame__c hud-frame__c--br" />
    </div>
  );
}
